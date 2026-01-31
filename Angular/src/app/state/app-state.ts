import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { Question } from '../models/question';
import { QuestionTestStatistics } from '../types/question-test-statistics';

export interface AppState {
  books: Book[];
  bookSelected?: Book;
  bookEdited?: Book;
  chapterEdited?: Chapter;
  chapterSelected?: Chapter;
  currentQuestion?: Question;
  libraryName: string;
  questionEdited?: Question;
  questionList: Question[];
  questionTestStatistics: QuestionTestStatistics;
  repeatWrongQuestions: boolean;
  version: string;
  viewMode: string;
}
