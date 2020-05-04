import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/book';
import { BooksOverviewComponent } from 'src/app/components/library/book/books-overview/books-overview.component';

export const getEmptyState = (): IAppState => {
  return {
    library: {
      books: [],
      bookIdToEdit: undefined
    }
  };
};

export const getStateWithBooks = (... books: Array<Book>) => {
  const state = getEmptyState();
  books.forEach(b => state.library.books.push(b));
  return state;
};
