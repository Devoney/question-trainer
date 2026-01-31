import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private readonly ollamaUrl = 'http://localhost:11434/api/generate';
  private readonly model = 'gpt-oss:20b';

  checkAnswer(question: string, expectedAnswer: string, userAnswer: string): Observable<AiCheckResult> {
    const prompt = this.buildPrompt(question, expectedAnswer, userAnswer);
    const payload = {
      model: this.model,
      prompt,
      stream: false,
    };

    return this.http.post<OllamaResponse>(this.ollamaUrl, payload).pipe(
      map((response) => this.parseResponse(response))
    );
  }

  private buildPrompt(question: string, expectedAnswer: string, userAnswer: string): string {
    return [
      'You are grading a study answer.',
      'Return JSON only in the form: {"correct": true|false, "reason": "..."}.',
      'If the answer is not exactly the same, but semantically correct/the same, return correct=true.',
      '',
      `Question: ${question}`,
      `Expected answer: ${expectedAnswer}`,
      `User answer: ${userAnswer}`,
    ].join('\n');
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
