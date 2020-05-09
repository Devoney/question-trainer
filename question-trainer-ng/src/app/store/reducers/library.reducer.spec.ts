import { libraryReducers } from './library.reducer';
import { ILibraryState } from '../state/library.state';
import { Book } from 'src/app/types/book';
import { AddBook, RemoveBook, SetBookIdToEdit, UpdateBook, SetSelectedBookId } from '../actions/books.actions';
import { getRandomBook, getRandomBookWithChapters, getRandomChapter } from 'test/library';
import { getStateWithBooks } from 'test/store';
import { AddChapter } from '../actions/chapters.actions';

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

  it('Should update book.', () => {
    // Given
    const book1 = getRandomBook();
    const bookId = book1.id;
    const newTitle = 'My beautiful book';
    const book2 = getRandomBook();
    const book2OriginalTitle = book2.title;
    const initialState = getStateWithBooks(book1, book2);
    book1.title = newTitle;
    const action = new UpdateBook(book1);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    const expectedUpdatedBook = actual.books.find(b => b.id === bookId);
    expect(expectedUpdatedBook).toBeDefined();
    expect(expectedUpdatedBook.title).toBe(newTitle);

    const expectedNotUpdatedBook = actual.books.find(b => b.id !== bookId);
    expect(expectedNotUpdatedBook).toBeDefined();
    expect(expectedNotUpdatedBook.title).toBe(book2OriginalTitle);
  });

  it('Should add chapter to book.', () => {
    // Given
    const nrOfChapters = 3;
    const book1 = getRandomBookWithChapters(2);
    const book2 = getRandomBookWithChapters(nrOfChapters);
    const initialState = getStateWithBooks(book1, book2);
    const chapter = getRandomChapter();
    const action = new AddChapter(book2.id, chapter);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    console.log(book2);
    const book = actual.books.find(b => b.id === book2.id);
    expect(book.chapters.length).toBe(nrOfChapters + 1);
    expect(book.chapters[nrOfChapters]).toBe(chapter);
  });

  it('Should set selected book id.', () => {
    // Given
    const book1 = getRandomBook();
    const book2 = getRandomBook();
    const initialState = getStateWithBooks(book1, book2);
    const action = new SetSelectedBookId(book2.id);

    // When
    const actual = libraryReducers(initialState.library, action);

    // Then
    expect(actual.bookIdSelected).toBe(book2.id);
  });
});
