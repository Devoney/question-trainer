import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectQuestionList } from '../../../state/app.selectors';
import { ClearButton } from '../clear-button/clear-button';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { QuestionListRecord } from '../question-list-record/question-list-record';

@Component({
  selector: 'app-question-list',
  imports: [CommonModule, ClearButton, IconButtonComponent, QuestionListRecord],
  templateUrl: './question-list.html',
  styleUrl: './question-list.css',
})
export class QuestionList {
  readonly questionsInList$!: Observable<ReturnType<typeof selectQuestionList>>;
  readonly listHasNoQuestions$!: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.questionsInList$ = this.store.select(selectQuestionList);
    this.listHasNoQuestions$ = this.questionsInList$.pipe(map((list) => list.length === 0));
  }
}
