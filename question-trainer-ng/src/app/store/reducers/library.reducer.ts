import { initialLibraryState, ILibraryState } from '../state/library.state';
import { BooksAction, BooksActionTypes, UpdateBook } from '../actions/books.actions';
import { ChaptersActionTypes, ChaptersAction } from '../actions/chapters.actions';

export function libraryReducers(state = initialLibraryState, action: BooksAction | ChaptersAction): ILibraryState {
  switch (action.type) {
    //#region Books
    case BooksActionTypes.Add: {
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    }

    case BooksActionTypes.Remove: {
      const books = state.books.filter(book => book.id !== action.bookId);
      return {
        ...state,
        books
      };
    }

    case BooksActionTypes.SetBookIdToEdit: {
      return {
        ...state,
        bookIdToEdit: action.bookId
      };
    }

    case BooksActionTypes.UpdateBook: {
      const books = state.books.filter(b => b.id !== action.book.id);
      books.push(action.book);
      return {
        ...state,
        books
      };
    }

    case BooksActionTypes.SetSelectedBookId: {
      return {
        ...state,
        bookIdSelected: action.bookId,
      };
    }
    //#endregion

    //#region Chapters
    case ChaptersActionTypes.Add: {
      const book = state.books.find(b => b.id === action.bookId);
      book.chapters.push(action.chapter);
      return {
        ...state
      };
    }
    //#endregion
  }
}
