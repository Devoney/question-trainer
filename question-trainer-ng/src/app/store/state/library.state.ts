import { Book } from '../../types/book';

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
