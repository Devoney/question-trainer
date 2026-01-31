import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectQuestionList } from '../../../state/app.selectors';
import { clearQuestionList } from '../../../state/app.actions';

@Component({
  selector: 'app-clear-button',
  imports: [CommonModule],
  templateUrl: './clear-button.html',
  styleUrl: './clear-button.css',
})
export class ClearButton {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  readonly listHasNoQuestions$ = this.store
    .select(selectQuestionList)
    .pipe(map((list) => !list || list.length === 0));

  clear(): void {
    this.store.dispatch(clearQuestionList());
  }
}
