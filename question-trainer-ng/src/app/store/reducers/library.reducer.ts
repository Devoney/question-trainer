import { initialLibraryState, ILibraryState } from '../state/library.state';
import { BooksAction, BooksActionTypes, UpdateBook } from '../actions/books.actions';
import { ChaptersActionTypes, ChaptersAction } from '../actions/chapters.actions';
import * as _ from 'lodash';

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
      let book = state.books.find(b => b.id === action.bookId);
      const chapters = [...book.chapters, action.chapter];
      book = {
        ...book,
        chapters
      };

      const books = _.filter(state.books, b => b.id !== book.id);
      books.push(book);

      return {
        ...state,
        books,
      };
    }
    //#endregion
  }
}
