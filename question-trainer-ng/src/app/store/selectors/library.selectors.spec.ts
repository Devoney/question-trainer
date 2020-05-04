import { selectBooks, selectNrOfBooks, selectBookIdToEdit, selectBookToEdit } from './library.selectors';
import { Book } from 'src/app/types/Book';
import { IAppState } from '../state/app.state';
import { getStateWithBooks } from 'test/store';
import { getRandomBook } from 'test/library';

describe('LibrarySelectors', () => {
  const book1 = getRandomBook();
  const book2 = getRandomBook();
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

  it('Should select book id to edit', () => {
    // Given
    const expected = book1.id;
    appState.library.bookIdToEdit = expected;

    // When
    const actual = selectBookIdToEdit.projector(appState.library);

    // Then
    expect(actual).toBe(expected);
  });

  it('Should select book to edit', () => {
    // Given
    const expected = book1;
    appState.library.bookIdToEdit = expected.id;

    // When
    const actual = selectBookToEdit.projector(appState.library.books, expected.id);

    // Then
    expect(actual).toBe(expected);
  });
});
