import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideTransloco, translocoConfig, TranslocoLoader } from '@ngneat/transloco';
import { of } from 'rxjs';
import { AnswerCheckerService } from './answer-checker.service';

describe('AnswerCheckerService', () => {
  class TestTranslocoLoader implements TranslocoLoader {
    getTranslation() {
      return of({
        aiCheck: {
          prompt: {
            intro: 'You are grading a study answer.',
            format: 'Return JSON only in the form: {"correct": true|false, "reason": "..."}.',
            semantic:
              'If the answer is not exactly the same, but semantically correct/the same, return correct=true.',
            question: 'Question: {{question}}',
            expected: 'Expected answer: {{expectedAnswer}}',
            user: 'User answer: {{userAnswer}}',
          },
        },
      });
    }
  }

  it('parses JSON response from Ollama', () => {
    TestBed.configureTestingModule({
      providers: [
        AnswerCheckerService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: translocoConfig({
            availableLangs: ['en'],
            defaultLang: 'en',
          }),
          loader: TestTranslocoLoader,
        }),
      ],
    });

    const service = TestBed.inject(AnswerCheckerService);
    const httpMock = TestBed.inject(HttpTestingController);

    let result: { correct: boolean; reason?: string } | undefined;
    service.checkAnswer('Q', 'A', 'U').subscribe((res) => (result = res));

    const req = httpMock.expectOne('http://localhost:11434/api/generate');
    expect(req.request.method).toBe('POST');
    req.flush({ response: '{"correct": true, "reason": "ok"}' });

    expect(result).toEqual({ correct: true, reason: 'ok' });
    httpMock.verify();
  });
});
