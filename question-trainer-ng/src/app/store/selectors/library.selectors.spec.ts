import { selectBooks, selectNrOfBooks } from './library.selectors';
import { Book } from 'src/app/types/Book';
import { IAppState } from '../state/app.state';
import { getStateWithBooks } from 'test/store';

describe('LibrarySelectors', () => {
  const book1 = {
    title: 'Book 1'
  } as Book;
  const book2 = {
    title: 'Book 2'
  } as Book;
  const appState = getStateWithBooks(book1, book2);

  it('selectBooks should return books.', () => {
    // Given
    const expected = appState.library.books;

    // When
    const actual = selectBooks.projector(appState.library);

    // Then
    expect(actual).toBe(expected);
  });

  it('Should select count of books', () => {
    // Given
    const expected = appState.library.books.length;

    // When
    const actual = selectNrOfBooks.projector(appState.library.books);

    // Then
    expect(actual).toBe(expected);
  });
});
