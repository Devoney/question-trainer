import { TestBed } from '@angular/core/testing';
import { Observable, of, firstValueFrom } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { hydrateState } from './app.actions';
import { initialAppState } from './app.reducer';
import { AppState } from './app-state';

describe('AppEffects', () => {
  let actions$: Observable<unknown>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: { app: initialAppState } }),
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  it('hydrates state from localStorage on init', async () => {
    const storedState: AppState = { ...initialAppState, libraryName: 'Test' };
    localStorage.setItem('store', JSON.stringify(storedState));

    actions$ = of({ type: ROOT_EFFECTS_INIT });

    const action = await firstValueFrom(effects.hydrate$);

    expect(action).toEqual(hydrateState({ state: storedState }));
    localStorage.removeItem('store');
  });
});
