import Book from '@/models/Book';

export default interface IState  {
  books: Book[];
  bookSelected: Book | undefined;
  bookEdited: Book | undefined;
}
