import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ILibraryState, initialLibraryState } from '../state/library.state';
import { Book } from 'src/app/types/book';
import * as _ from 'lodash';

const selectLibrary = (state: IAppState) => {
  return (state && state.library) ? state.library : initialLibraryState;
};

//#region Books
export const selectBooks = createSelector(
  selectLibrary,
  (libraryState: ILibraryState) => {
    return libraryState.books;
  }
);

export const selectBooksOrderedByTitle = createSelector(
  selectBooks,
  (books) => {
    return _.orderBy(books, b => b.title);
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

export const selectSelectedBook = createSelector(
  selectBooks,
  selectSelectedBookId,
  (books, selectedBookId) => {
    return books.find(b => b.id === selectedBookId);
  }
);
//#endregion

//#region Chapters
export const selectChaptersOfSelectedBook = createSelector(
  selectSelectedBook,
  (selectedBook) => {
    if (!selectedBook) {
      return [];
    }

    return selectedBook.chapters;
  }
);
//#endregion
