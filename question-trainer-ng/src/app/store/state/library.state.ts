import { Book } from '../../types/Book';

export interface ILibraryState {
  books: Book[]
}

export const initialLibraryState: ILibraryState = {
  books: []
};