import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectChapterSelected } from '../../../state/app.selectors';
import { AddQuestion } from '../add-question/add-question';
import { QuestionTable } from '../question-table/question-table';

@Component({
  selector: 'app-question-manager',
  imports: [CommonModule, AddQuestion, QuestionTable],
  templateUrl: './question-manager.html',
  styleUrl: './question-manager.css',
})
export class QuestionManager {
  private readonly store = inject<Store<{ app: AppState }>>(Store);

  readonly showQuestionTable$ = this.store
    .select(selectChapterSelected)
    .pipe(map((chapter) => !!chapter));
}
