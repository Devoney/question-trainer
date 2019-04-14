import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

export default interface IState  {
  books: Book[];
  bookSelected: Book | undefined;
  bookEdited: Book | undefined;
  chapterEdited: Chapter | undefined;
  chapterSelected: Chapter | undefined;
  questionEdited: Question | undefined;
  questionList: Question[];
}
