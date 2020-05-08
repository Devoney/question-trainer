import { Book } from '../../types/book';
import { environment } from 'src/environments/environment';
import { getBookWithTitle, getRandomBookWithChapters } from 'test/library';

export interface ILibraryState {
  books: Book[];
  bookIdToEdit: string;
  bookIdSelected: string;
}

export const initialLibraryState: ILibraryState = {
  books: [],
  bookIdToEdit: null,
  bookIdSelected: null,
};

if (environment.addTestData) {  
  initialLibraryState.books.push(getRandomBookWithChapters(3));
  initialLibraryState.books.push(getRandomBookWithChapters(5));
  initialLibraryState.books.push(getRandomBookWithChapters(7));
}
