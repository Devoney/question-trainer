import { libraryReducers } from './library.reducer';
import { ILibraryState } from '../state/library.state';
import { Book } from 'src/app/types/Book';
import { AddBook, RemoveBook } from '../actions/books.actions';

describe('LibraryReducer', () => {
  it('Should add a book.', () => {
    // Given
    const initialState: ILibraryState = {
      books: [{
        id: '1',
      } as Book
    ]};
    const book = {
      id: '2'
    } as Book;
    const action = new AddBook(book);

    // When
    const actual = libraryReducers(initialState, action);

    // Then
    expect(actual.books.length).toBe(2);
    expect(actual.books).toContain(book);
  });

  it('Should remove a book.', () => {
    // Given
    const book = {
      id: '2'
    } as Book;
    const bookIdToRemove = '1';
    const initialState: ILibraryState = {
      books: [{
        id: bookIdToRemove,
      } as Book,
      book
    ]};
    const action = new RemoveBook(bookIdToRemove);

    // When
    const actual = libraryReducers(initialState, action);

    // Then
    expect(actual.books.length).toBe(1);
    expect(actual.books).toContain(book);
  });
});
