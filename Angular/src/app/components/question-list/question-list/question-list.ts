import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectQuestionList } from '../../../state/app.selectors';
import { ClearButton } from '../clear-button/clear-button';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { QuestionListRecord } from '../question-list-record/question-list-record';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-question-list',
  imports: [CommonModule, ClearButton, IconButtonComponent, QuestionListRecord, TranslocoModule],
  templateUrl: './question-list.html',
  styleUrl: './question-list.css',
})
export class QuestionList {
  private readonly store = inject<Store<{ app: AppState }>>(Store);

  readonly questionsInList$ = this.store.select(selectQuestionList);
  readonly listHasNoQuestions$ = this.questionsInList$.pipe(map((list) => list.length === 0));
}
