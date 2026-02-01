import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IngestedQuestion {
  question: string;
  answer: string;
  pageNr?: string;
}

export interface IngestionStreamEvent {
  type: 'chunk' | 'result';
  stage: 'ocr' | 'qa';
  text: string;
  items?: IngestedQuestion[];
}

interface OllamaResponse {
  response?: string;
}

@Injectable({ providedIn: 'root' })
export class PhotoQaIngestionService {
  private readonly http = inject(HttpClient);
  private readonly transloco = inject(TranslocoService);
  private readonly qaEndpointStorageKey = 'aiEndpointUrl';
  private readonly ocrEndpointStorageKey = 'aiOcrEndpointUrl';
  private readonly qaModelStorageKey = 'aiQaModelName';
  private readonly ocrModelStorageKey = 'aiOcrModelName';
  private readonly defaultOllamaUrl = 'http://localhost:11434/api/generate';
  private readonly mockResponseUrl = '/ingest-book-example-response.json';
  private readonly defaultQaModel = 'qwen3-vl:2b'; // 'llava:13b';
  private readonly defaultOcrModel = 'qwen3-vl:2b';
  private readonly useMockResponse = false; // Set to true to use mock response for local testing.

  ingestPhoto(
    base64Image: string,
    pageNr?: string,
    additionalInstructions?: string
  ): Observable<IngestedQuestion[]> {
    if (this.useMockResponse) {
      return this.http
        .get<OllamaResponse>(this.mockResponseUrl)
        .pipe(map((response) => this.parseResponse(response)));
    }

    const ocrPayload = {
      model: this.getOcrModel(),
      prompt: this.buildOcrPrompt(),
      images: [base64Image],
      stream: false,
    };

    return this.http.post<OllamaResponse>(this.getOcrOllamaUrl(), ocrPayload).pipe(
      map((response) => this.extractOcrText(response)),
      switchMap((ocrText) => {
        const prompt = this.buildQaPrompt(ocrText, pageNr, additionalInstructions);
        const qaPayload = {
          model: this.getQaModel(),
          prompt,
          stream: false,
        };
        return this.http
          .post<OllamaResponse>(this.getQaOllamaUrl(), qaPayload)
          .pipe(map((response) => this.parseResponse(response)));
      })
    );
  }

  ingestPhotoStream(
    base64Image: string,
    pageNr?: string,
    additionalInstructions?: string
  ): Observable<IngestionStreamEvent> {
    if (this.useMockResponse) {
      return this.http.get<OllamaResponse>(this.mockResponseUrl).pipe(
        map((response) => {
          const items = this.parseResponse(response);
          return {
            type: 'result',
            stage: 'qa',
            text: response?.response?.trim() ?? '',
            items,
          } as IngestionStreamEvent;
        })
      );
    }

    return new Observable<IngestionStreamEvent>((observer) => {
      const controller = new AbortController();

      const run = async (): Promise<void> => {
        const ocrPayload = {
          model: this.getOcrModel(),
          prompt: this.buildOcrPrompt(),
          images: [base64Image],
          stream: true,
        };

        const ocrText = await this.streamOllamaRequest(
          this.getOcrOllamaUrl(),
          ocrPayload,
          (chunk) => observer.next({ type: 'chunk', stage: 'ocr', text: chunk }),
          controller.signal
        );

        if (!ocrText.trim()) {
          throw new Error('Empty OCR response.');
        }

        const prompt = this.buildQaPrompt(ocrText, pageNr, additionalInstructions);
        const qaPayload = {
          model: this.getQaModel(),
          prompt,
          stream: false,
        };

        const qaResponse = await this.requestOllamaOnce(
          this.getQaOllamaUrl(),
          qaPayload,
          controller.signal
        );

        const items = this.parseResponse(qaResponse);
        observer.next({ type: 'result', stage: 'qa', text: qaResponse?.response ?? '', items });
        observer.complete();
      };

      run().catch((error) => observer.error(error));

      return () => {
        controller.abort();
      };
    });
  }

  getQaOllamaUrl(): string {
    return localStorage.getItem(this.qaEndpointStorageKey) ?? this.defaultOllamaUrl;
  }

  getOcrOllamaUrl(): string {
    const stored = localStorage.getItem(this.ocrEndpointStorageKey) ?? '';
    if (stored.trim()) {
      return stored;
    }
    return this.getQaOllamaUrl();
  }

  getStoredOcrOllamaUrl(): string {
    return localStorage.getItem(this.ocrEndpointStorageKey) ?? '';
  }

  getQaModel(): string {
    return localStorage.getItem(this.qaModelStorageKey) ?? this.defaultQaModel;
  }

  getOcrModel(): string {
    return localStorage.getItem(this.ocrModelStorageKey) ?? this.defaultOcrModel;
  }

  getDefaultOllamaUrl(): string {
    return this.defaultOllamaUrl;
  }

  getDefaultQaModel(): string {
    return this.defaultQaModel;
  }

  getDefaultOcrModel(): string {
    return this.defaultOcrModel;
  }

  setQaOllamaUrl(url: string): void {
    const value = url.trim();
    if (value) {
      localStorage.setItem(this.qaEndpointStorageKey, value);
      return;
    }
    localStorage.removeItem(this.qaEndpointStorageKey);
  }

  setOcrOllamaUrl(url: string): void {
    const value = url.trim();
    if (value) {
      localStorage.setItem(this.ocrEndpointStorageKey, value);
      return;
    }
    localStorage.removeItem(this.ocrEndpointStorageKey);
  }

  setQaModel(model: string): void {
    const value = model.trim();
    if (value) {
      localStorage.setItem(this.qaModelStorageKey, value);
      return;
    }
    localStorage.removeItem(this.qaModelStorageKey);
  }

  setOcrModel(model: string): void {
    const value = model.trim();
    if (value) {
      localStorage.setItem(this.ocrModelStorageKey, value);
      return;
    }
    localStorage.removeItem(this.ocrModelStorageKey);
  }

  private buildOcrPrompt(): string {
    return this.transloco.translate('ingestPhoto.ocrPrompt');
  }

  private buildQaPrompt(ocrText: string, pageNr?: string, additionalInstructions?: string): string {
    const language = this.getUserLanguageLabel();
    const pageNrLabel = pageNr?.trim() ? pageNr.trim() : this.transloco.translate('ingestPhoto.prompt.pageNotProvided');
    const instructions = additionalInstructions?.trim();
    const lines = [
      this.transloco.translate('ingestPhoto.prompt.intro'),
      this.transloco.translate('ingestPhoto.prompt.format'),
      this.transloco.translate('ingestPhoto.prompt.empty'),
      this.transloco.translate('ingestPhoto.prompt.language', { language }),
      this.transloco.translate('ingestPhoto.prompt.pageNr', { pageNr: pageNrLabel }),
      this.transloco.translate('ingestPhoto.prompt.ocrText', {
        text: ocrText,
      }),
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

  private extractOcrText(response: OllamaResponse): string {
    const text = response?.response?.trim() ?? '';
    if (!text) {
      throw new Error('Empty OCR response.');
    }
    return this.stripCodeFences(text);
  }

  private async streamOllamaRequest(
    url: string,
    payload: unknown,
    onChunk: (chunk: string) => void,
    signal: AbortSignal
  ): Promise<string> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok || !response.body) {
      throw new Error('Failed to reach Ollama endpoint.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          continue;
        }
        const parsed = JSON.parse(trimmed) as OllamaResponse & { done?: boolean };
        const chunk = parsed.response ?? '';
        if (chunk) {
          fullText += chunk;
          onChunk(chunk);
        }
        if (parsed.done) {
          break;
        }
      }
    }

    const leftover = buffer.trim();
    if (leftover) {
      const parsed = JSON.parse(leftover) as OllamaResponse & { done?: boolean };
      const chunk = parsed.response ?? '';
      if (chunk) {
        fullText += chunk;
        onChunk(chunk);
      }
    }

    return fullText;
  }

  private async requestOllamaOnce(url: string, payload: unknown, signal: AbortSignal): Promise<OllamaResponse> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error('Failed to reach Ollama endpoint.');
    }

    return (await response.json()) as OllamaResponse;
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
