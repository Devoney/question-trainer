import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from '../../../models/question';
import { AppState } from '../../../state/app-state';
import { selectChapterSelected } from '../../../state/app.selectors';
import { QuestionRecord } from '../question-record/question-record';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-question-table',
  imports: [CommonModule, QuestionRecord, TranslocoModule],
  templateUrl: './question-table.html',
  styleUrl: './question-table.css',
})
export class QuestionTable {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  readonly questions$ = this.store
    .select(selectChapterSelected)
    .pipe(map((chapter) => chapter?.questions ?? []));
  readonly hasQuestions$ = this.questions$.pipe(map((questions) => questions.length > 0));
}
