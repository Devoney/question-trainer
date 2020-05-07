import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/book';

export const getEmptyState = (): IAppState => {
  return {
    library: {
      books: [],
      bookIdToEdit: undefined,
      bookIdSelected: undefined,
    }
  };
};

export const getStateWithBooks = (... books: Array<Book>) => {
  const state = getEmptyState();
  books.forEach(b => state.library.books.push(b));
  return state;
};
