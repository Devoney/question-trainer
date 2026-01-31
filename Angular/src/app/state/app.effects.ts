import { Injectable, inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from './app-state';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<{ app: AppState }>);

  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const stored = localStorage.getItem('store');
        if (!stored) {
          return { type: '[App] Noop' } as const;
        }
        const state = JSON.parse(stored) as AppState;
        return AppActions.hydrateState({ state });
      })
    )
  );

  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(
          (action) =>
            action.type !== AppActions.hydrateState.type && action.type !== ROOT_EFFECTS_INIT
        ),
        withLatestFrom(this.store.select((state) => state.app)),
        tap(([_, appState]) => {
          const stateToPersist: AppState = {
            ...appState,
            questionList: [],
            currentQuestion: undefined,
            questionEdited: undefined,
            bookEdited: undefined,
            chapterEdited: undefined
          };
          localStorage.setItem('store', JSON.stringify(stateToPersist));
        })
      ),
    { dispatch: false }
  );
}
