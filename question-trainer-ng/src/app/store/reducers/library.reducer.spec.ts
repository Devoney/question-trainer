import { libraryReducers } from './library.reducer';
import { ILibraryState } from '../state/library.state';
import { Book } from 'src/app/types/Book';
import { AddBook, RemoveBook, SetBookIdToEdit } from '../actions/books.actions';
import { getRandomBook } from 'test/library';
import { getStateWithBooks } from 'test/store';

describe('LibraryReducer', () => {
  it('Should add a book.', () => {
    // Given
    const existingBook = getRandomBook();
    const initialState = getStateWithBooks(existingBook);
    const bookToAdd = getRandomBook();
    const action = new AddBook(bookToAdd);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    expect(actual.books.length).toBe(2);
    expect(actual.books).toContain(bookToAdd);
  });

  it('Should remove a book.', () => {
    // Given
    const bookToKeep = getRandomBook();
    const bookToRemove = getRandomBook();
    const initialState = getStateWithBooks(bookToKeep, bookToRemove);
    const action = new RemoveBook(bookToRemove.id);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    expect(actual.books.length).toBe(1);
    expect(actual.books).toContain(bookToKeep);
  });

  it('Should set book id to edit.', () => {
    // Given
    const book = getRandomBook();
    const initialState = getStateWithBooks(book);
    const action = new SetBookIdToEdit(book.id);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    expect(actual.bookIdToEdit).toBe(book.id);
  });
});
