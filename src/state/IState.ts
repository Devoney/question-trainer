import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import QuestionTestStatistics from '@/types/QuestionTestStatistics';

export default interface IState  {
  books: Book[];
  bookSelected: Book | undefined;
  bookEdited: Book | undefined;
  chapterEdited: Chapter | undefined;
  chapterSelected: Chapter | undefined;
  currentQuestion: Question | undefined;
  libraryName: string;
  questionEdited: Question | undefined;
  questionList: Question[];
  questionTestStatistics: QuestionTestStatistics;
  repeatWrongQuestions: boolean;
  version: string;
  viewMode: string;
}
