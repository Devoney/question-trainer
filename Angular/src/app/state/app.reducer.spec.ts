import { appReducer, initialAppState } from './app.reducer';
import { addBook, setViewMode } from './app.actions';
import { Book } from '../models/book';

describe('appReducer', () => {
  it('returns initial state by default', () => {
    const state = appReducer(undefined, { type: 'noop' } as never);

    expect(state.viewMode).toBe(initialAppState.viewMode);
    expect(state.books.length).toBe(0);
  });

  it('adds a book', () => {
    const book = new Book('1', 'Book');
    const state = appReducer(initialAppState, addBook({ book }));

    expect(state.books.length).toBe(1);
    expect(state.books[0]).toBe(book);
  });

  it('sets view mode', () => {
    const state = appReducer(initialAppState, setViewMode({ viewMode: 'library' }));

    expect(state.viewMode).toBe('library');
  });
});
