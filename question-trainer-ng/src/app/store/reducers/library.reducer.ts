import { initialLibraryState, ILibraryState } from '../state/library.state';
import { BooksAction, BooksActionTypes } from '../actions/books.actions';

export const libraryReducers = (state = initialLibraryState, action: BooksAction): ILibraryState => {
  switch (action.type) {
    case BooksActionTypes.Add: {
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    }

    case BooksActionTypes.Remove: {
      return {
        ...state
      };
    }
  }
};
