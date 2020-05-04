import { initialLibraryState, ILibraryState } from '../state/library.state';
import { BooksAction, BooksActionTypes } from '../actions/books.actions';

export function libraryReducers(state = initialLibraryState, action: BooksAction): ILibraryState {
  switch (action.type) {
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
  }
}
