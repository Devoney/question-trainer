import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ILibraryState, initialLibraryState } from '../state/library.state';
import { Book } from 'src/app/types/book';


const selectLibrary = (state: IAppState) => {
  return (state && state.library) ? state.library : initialLibraryState;
};

export const selectBooks = createSelector(
  selectLibrary,
  (libraryState: ILibraryState) => {
    return libraryState.books;
  }
);

export const selectNrOfBooks = createSelector(
  selectBooks,
  (books: Array<Book>) => {
    if (!books) {
      return 0;
    }
    return books.length;
  }
);

export const selectBookIdToEdit = createSelector(
  selectLibrary,
  (libraryState: ILibraryState) => {
    return libraryState.bookIdToEdit;
  }
);

export const selectBookToEdit = createSelector(
  selectBooks,
  selectBookIdToEdit,
  (books, bookId) => {
    return books.find(b => b.id === bookId);
  }
);

export const selectSelectedBookId = createSelector(
  selectLibrary,
  (library) => {
    return library.bookIdSelected;
  }
);
