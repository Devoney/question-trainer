import Book from '@/models/Book';
import Chapter from '@/models/Chapter';

export default interface IState  {
  books: Book[];
  bookSelected: Book | undefined;
  bookEdited: Book | undefined;
  chapterEdited: Chapter | undefined;
}
