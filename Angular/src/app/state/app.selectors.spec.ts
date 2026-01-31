import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { selectBooksSortedByTitle, selectChaptersSortedByTitle, selectViewMode } from './app.selectors';
import { AppState } from './app-state';

const buildState = (partial: Partial<AppState>): AppState => ({
  books: [],
  libraryName: '',
  questionList: [],
  questionTestStatistics: { correctCount: 0, wrongCount: 0 },
  repeatWrongQuestions: true,
  version: '0.0.0',
  viewMode: 'both',
  ...partial,
});

describe('app.selectors', () => {
  it('selectBooksSortedByTitle sorts books', () => {
    const books = [new Book('1', 'b'), new Book('2', 'a')];
    const state = buildState({ books });

    const result = selectBooksSortedByTitle.projector(state.books);

    expect(result.map((b) => b.title)).toEqual(['a', 'b']);
  });

  it('selectChaptersSortedByTitle sorts chapters', () => {
    const chapters = [new Chapter('1', '2', 'B'), new Chapter('2', '1', 'A')];
    const book = new Book('1', 'Book', chapters);
    const state = buildState({ bookSelected: book });

    const result = selectChaptersSortedByTitle.projector(state.bookSelected);

    expect(result.map((c) => c.nr)).toEqual(['1', '2']);
  });

  it('selectViewMode returns view mode', () => {
    const state = buildState({ viewMode: 'library' });

    const result = selectViewMode.projector(state);

    expect(result).toBe('library');
  });
});
