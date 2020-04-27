import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ILibraryState, initialLibraryState } from '../state/library.state';

export const selectBooks = createSelector(
  (state: IAppState) => {
    return (state && state.library) ? state.library : initialLibraryState;
  },
  (libraryState: ILibraryState) => {
    return libraryState.books;
  }
);