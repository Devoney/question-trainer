import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IngestedQuestion {
  question: string;
  answer: string;
  pageNr?: string;
}

interface OllamaResponse {
  response?: string;
}

@Injectable({ providedIn: 'root' })
export class PhotoQaIngestionService {
  private readonly http = inject(HttpClient);
  private readonly transloco = inject(TranslocoService);
  private readonly endpointStorageKey = 'aiEndpointUrl';
  private readonly defaultOllamaUrl = 'http://localhost:11434/api/generate';
  private readonly mockResponseUrl = '/ingest-book-example-response.json';
  private readonly model = 'qwen3-vl:2b'; // 'llava:13b';
  private readonly useMockResponse = false; // Set to true to use mock response for local testing.

  ingestPhoto(
    base64Image: string,
    pageNr?: string,
    additionalInstructions?: string
  ): Observable<IngestedQuestion[]> {
    const prompt = this.buildPrompt(pageNr, additionalInstructions);
    const payload = {
      model: this.model,
      prompt,
      images: [base64Image],
      stream: false,
    };

    if (this.useMockResponse) {
      return this.http
        .get<OllamaResponse>(this.mockResponseUrl)
        .pipe(map((response) => this.parseResponse(response)));
    }

    return this.http
      .post<OllamaResponse>(this.getOllamaUrl(), payload)
      .pipe(map((response) => this.parseResponse(response)));
  }

  private getOllamaUrl(): string {
    return localStorage.getItem(this.endpointStorageKey) ?? this.defaultOllamaUrl;
  }

  private buildPrompt(pageNr?: string, additionalInstructions?: string): string {
    const language = this.getUserLanguageLabel();
    const pageNrLabel = pageNr?.trim() ? pageNr.trim() : this.transloco.translate('ingestPhoto.prompt.pageNotProvided');
    const instructions = additionalInstructions?.trim();
    const lines = [
      this.transloco.translate('ingestPhoto.prompt.intro'),
      this.transloco.translate('ingestPhoto.prompt.format'),
      this.transloco.translate('ingestPhoto.prompt.empty'),
      this.transloco.translate('ingestPhoto.prompt.language', { language }),
      this.transloco.translate('ingestPhoto.prompt.pageNr', { pageNr: pageNrLabel }),
    ];

    if (instructions) {
      lines.push(
        this.transloco.translate('ingestPhoto.prompt.additionalInstructions', {
          instructions,
        })
      );
    }

    return lines.join('\n');
  }

  private getUserLanguageLabel(): string {
    const activeLang = this.transloco.getActiveLang();
    if (activeLang === 'nl') {
      return this.transloco.translate('common.langDutch');
    }
    if (activeLang === 'en') {
      return this.transloco.translate('common.langEnglish');
    }
    return activeLang;
  }

  private parseResponse(response: OllamaResponse): IngestedQuestion[] {
    const raw = response?.response?.trim() ?? '';
    if (!raw) {
      throw new Error('Empty AI response.');
    }

    const cleaned = this.stripCodeFences(raw);
    const jsonPayload = this.extractJsonPayload(cleaned);
    const parsed = JSON.parse(jsonPayload) as unknown;
    const items = this.extractItems(parsed);

    return items
      .map((item) => this.normalizeItem(item))
      .filter((item): item is IngestedQuestion => !!item);
  }

  private stripCodeFences(value: string): string {
    return value.replace(/```json/gi, '').replace(/```/g, '').trim();
  }

  private extractJsonPayload(value: string): string {
    const trimmed = value.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return trimmed;
    }

    const arrayStart = trimmed.indexOf('[');
    const objectStart = trimmed.indexOf('{');
    const hasArray = arrayStart !== -1;
    const hasObject = objectStart !== -1;

    if (!hasArray && !hasObject) {
      return trimmed;
    }

    const start = !hasObject || (hasArray && arrayStart < objectStart) ? arrayStart : objectStart;
    const end = start === arrayStart ? trimmed.lastIndexOf(']') : trimmed.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      return trimmed;
    }
    return trimmed.slice(start, end + 1);
  }

  private extractItems(parsed: unknown): unknown[] {
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && typeof parsed === 'object') {
      const record = parsed as Record<string, unknown>;
      if (Array.isArray(record['items'])) {
        return record['items'];
      }
      if (Array.isArray(record['questions'])) {
        return record['questions'];
      }
      if (record['question'] || record['answer'] || record['q'] || record['a']) {
        return [record];
      }
    }
    return [];
  }

  private normalizeItem(item: unknown): IngestedQuestion | null {
    if (!item || typeof item !== 'object') {
      return null;
    }
    const record = item as Record<string, unknown>;
    const questionRaw = record['question'] ?? record['q'] ?? record['prompt'];
    const answerRaw = record['answer'] ?? record['a'] ?? record['response'];
    const pageRaw = record['pageNr'] ?? record['page'] ?? record['pageNumber'];

    const question = typeof questionRaw === 'string' ? questionRaw.trim() : '';
    const answer = typeof answerRaw === 'string' ? answerRaw.trim() : '';
    let pageNr: string | undefined;
    if (typeof pageRaw === 'string') {
      pageNr = pageRaw.trim();
    } else if (typeof pageRaw === 'number' && Number.isFinite(pageRaw)) {
      pageNr = String(pageRaw);
    }

    if (!question || !answer) {
      return null;
    }

    return { question, answer, pageNr };
  }
}
