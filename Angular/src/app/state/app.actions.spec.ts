import { addBook, setViewMode } from './app.actions';
import { Book } from '../models/book';

describe('app.actions', () => {
  it('creates addBook action with payload', () => {
    const book = new Book('1', 'Title');
    const action = addBook({ book });

    expect(action.type).toBe('[Book] Add');
    expect(action.book).toBe(book);
  });

  it('creates setViewMode action', () => {
    const action = setViewMode({ viewMode: 'library' });

    expect(action.type).toBe('[App] Set View Mode');
    expect(action.viewMode).toBe('library');
  });
});
