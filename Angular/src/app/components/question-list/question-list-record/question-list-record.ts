import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state';
import { Question } from '../../../models/question';
import { truncateWithDots } from '../../../utils/text-transformers';
import { removeFromQuestionList } from '../../../state/app.actions';
import { IconButtonComponent } from '../../icon-button/icon-button';

@Component({
  selector: 'tr[app-question-list-record]',
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './question-list-record.html',
  styleUrl: './question-list-record.css',
})
export class QuestionListRecord {
  @Input({ required: true }) index!: number;
  @Input({ required: true }) question!: Question;
  private readonly store = inject<Store<{ app: AppState }>>(Store);

  get questionText(): string {
    return truncateWithDots(this.question.question, 60);
  }

  removeFromQuestionList(question: Question): void {
    this.store.dispatch(removeFromQuestionList({ question }));
  }
}
