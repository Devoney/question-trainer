import { assert } from 'chai';
import MutationTypes from '@/state/MutationTypes';
import store from '@/state/store';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';

describe('state/store', () => {
  it('Adding a book', () => {
    // Given
    store.state.books = [];
    const book = new Book('book-ida', 'My title');

    // When
    store.commit(MutationTypes.addBook, book);

    // Then
    assert.equal(store.state.books.length, 1, 'The book should have been added');
    const firstBook = store.state.books[0];
    assert.equal(firstBook.id, book.id);
  });

  it('Chapter is added to selected book.', () => {
    // Given
    const firstBook = new Book('book-idb', 'My title');
    const secondBook = new Book('book-idc', 'My title');
    store.state.books = [firstBook, secondBook];
    store.state.bookSelected = secondBook;
    const chapter = new Chapter('chapter-ida', 'nr', 'chapter-title');

    // When
    store.commit(MutationTypes.addChapter, chapter);

    // Then
    assert.equal(secondBook.chapters.length, 1, 'The chapter should have been added to the selected book.');
    const firstChapter = secondBook.chapters[0];
    assert.equal(firstChapter.id, chapter.id);
  });

  it('A chapter its number and title are updated, but id is not.', () => {
    // Given
    const chapter = new Chapter('chapter-idb', 'nr', 'chapter-title');
    store.state.chapterEdited = chapter;

    const newNr = 'My new nr';
    const newTitle = 'My new title';
    const newId = 'My new id';
    const updateValue = {
      id: newId,
      title: newTitle,
      nr: newNr,
    };

    // When
    store.commit(MutationTypes.editChapter, updateValue);

    // Then
    const updatedChapter = store.state.chapterEdited;
    const errorMessage = 'The id should never have been updated as this changes the reference to the chapter.';
    assert.notEqual(updatedChapter.id, newId, errorMessage);
    assert.equal(updatedChapter.nr, newNr);
    assert.equal(updatedChapter.title, newTitle);
  });
});
