import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from '../../../models/question';
import { AppState } from '../../../state/app-state';
import { selectChapterSelected } from '../../../state/app.selectors';
import { QuestionRecord } from '../question-record/question-record';

@Component({
  selector: 'app-question-table',
  imports: [CommonModule, QuestionRecord],
  templateUrl: './question-table.html',
  styleUrl: './question-table.css',
})
export class QuestionTable {
  readonly questions$!: Observable<Question[]>;
  readonly hasQuestions$!: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.questions$ = this.store
      .select(selectChapterSelected)
      .pipe(map((chapter) => chapter?.questions ?? []));
    this.hasQuestions$ = this.questions$.pipe(map((questions) => questions.length > 0));
  }
}
