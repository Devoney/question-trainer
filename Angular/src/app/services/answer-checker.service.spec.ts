import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AnswerCheckerService } from './answer-checker.service';

describe('AnswerCheckerService', () => {
  it('parses JSON response from Ollama', () => {
    TestBed.configureTestingModule({
      providers: [AnswerCheckerService, provideHttpClient(), provideHttpClientTesting()],
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
