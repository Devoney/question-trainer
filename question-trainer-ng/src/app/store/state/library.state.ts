import { Book } from '../../types/book';

export interface ILibraryState {
  books: Book[];
}

export const initialLibraryState: ILibraryState = {
  books: []
};
