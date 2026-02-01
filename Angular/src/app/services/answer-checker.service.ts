import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AiCheckResult {
  correct: boolean;
  reason?: string;
}

interface OllamaResponse {
  response?: string;
}

@Injectable({ providedIn: 'root' })
export class AnswerCheckerService {
  private readonly http = inject(HttpClient);
  private readonly transloco = inject(TranslocoService);
  private readonly endpointStorageKey = 'aiEndpointUrl';
  private readonly defaultOllamaUrl = 'http://localhost:11434/api/generate';
  private readonly modelStorageKey = 'aiAnswerModelName';
  private readonly defaultModel = 'gpt-oss:20b';

  checkAnswer(question: string, expectedAnswer: string, userAnswer: string): Observable<AiCheckResult> {
    const prompt = this.buildPrompt(question, expectedAnswer, userAnswer);
    const ollamaUrl = this.getOllamaUrl();
    const payload = {
      model: this.getModel(),
      prompt,
      stream: false,
    };

    return this.http.post<OllamaResponse>(ollamaUrl, payload).pipe(
      map((response) => this.parseResponse(response))
    );
  }

  getOllamaUrl(): string {
    return localStorage.getItem(this.endpointStorageKey) ?? this.defaultOllamaUrl;
  }

  getDefaultOllamaUrl(): string {
    return this.defaultOllamaUrl;
  }

  getModel(): string {
    return localStorage.getItem(this.modelStorageKey) ?? this.defaultModel;
  }

  getDefaultModel(): string {
    return this.defaultModel;
  }

  setOllamaUrl(url: string): void {
    localStorage.setItem(this.endpointStorageKey, url);
  }

  setModel(model: string): void {
    localStorage.setItem(this.modelStorageKey, model);
  }

  private buildPrompt(question: string, expectedAnswer: string, userAnswer: string): string {
    const language = this.getUserLanguageLabel();
    return [
      this.transloco.translate('aiCheck.prompt.intro'),
      this.transloco.translate('aiCheck.prompt.format'),
      this.transloco.translate('aiCheck.prompt.semantic'),
      this.transloco.translate('aiCheck.prompt.language', { language }),
      '',
      this.transloco.translate('aiCheck.prompt.question', { question }),
      this.transloco.translate('aiCheck.prompt.expected', { expectedAnswer }),
      this.transloco.translate('aiCheck.prompt.user', { userAnswer }),
    ].join('\n');
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

  private parseResponse(response: OllamaResponse): AiCheckResult {
    const raw = response?.response?.trim() ?? '';
    if (!raw) {
      return { correct: false, reason: 'No response from AI.' };
    }

    try {
      const parsed = JSON.parse(raw) as AiCheckResult;
      if (typeof parsed.correct === 'boolean') {
        return parsed;
      }
    } catch {
      // fall through to heuristic parsing
    }

    const normalized = raw.toLowerCase();
    if (normalized.includes('"correct"') && normalized.includes('true')) {
      return { correct: true, reason: raw };
    }
    if (normalized.includes('"correct"') && normalized.includes('false')) {
      return { correct: false, reason: raw };
    }

    if (normalized.startsWith('correct')) {
      return { correct: true, reason: raw };
    }
    if (normalized.startsWith('incorrect')) {
      return { correct: false, reason: raw };
    }

    return { correct: false, reason: raw };
  }
}
