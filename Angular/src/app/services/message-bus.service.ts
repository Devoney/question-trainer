import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionModalArgs } from '../types/question-modal-args';

@Injectable({ providedIn: 'root' })
export class MessageBusService {
  private questionModalSubject = new Subject<QuestionModalArgs>();

  showQuestionModal(args: QuestionModalArgs): void {
    this.questionModalSubject.next(args);
  }

  onShowQuestionModal(callback: (args: QuestionModalArgs) => void): void {
    this.questionModalSubject.subscribe(callback);
  }
}
