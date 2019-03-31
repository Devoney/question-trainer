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

  it('Correct book is removed and the rest of the books are kept.', () => {
    // Given
    const bookIdToKeep: string = '1';
    const bookIdToRemove: string = '2';
    store.state.books = [
      new Book(bookIdToKeep, 'First book'),
      new Book(bookIdToRemove, 'Second book'),
    ];

    // When
    store.commit(MutationTypes.removeBookById, bookIdToRemove);

    // Then
    assert.equal(store.state.books.length, 1, 'The book was not deletd.');
    const singleBook = store.state.books[0];
    assert.equal(singleBook.id, bookIdToKeep, 'The wrong book got deleted.');
  });

  it('Correct chapter of selected book is removed.', () => {
    // Given
    const chapterIdToKeep: string = 'CH 2.1';
    const chapterIdToRemove: string = 'CH 2.2';

    const firstBook = new Book('book-1', 'First Book', [
      // Having chapters in store that have the same id should never happen, but it makes this test
      // more strict. As it now also tests that the chapter is only removed of the book that was selected.
      new Chapter(chapterIdToKeep, 'chapter-1.1', 'First chapter'),
      new Chapter(chapterIdToRemove, 'chapter-1.2', 'Second chapter'),
    ]);

    const secondBook = new Book('book-2', 'Second Book', [
      new Chapter(chapterIdToKeep, 'chapter-2.1', 'First chapter'),
      new Chapter(chapterIdToRemove, 'chapter-2.2', 'Second chapter'),
    ]);
    store.state.books = [
      firstBook,
      secondBook,
    ];
    store.state.bookSelected = secondBook;

    // When
    store.commit(MutationTypes.removeChapterById, chapterIdToRemove);

    // Then
    assert.equal(firstBook.chapters.length, 2, 'Chapter got removed on the wrong book.');
    assert.equal(secondBook.chapters.length, 1, 'Chapter was not deleted on selected book.');
    const chapterKept = secondBook.chapters[0];
    assert.equal(chapterKept.id, chapterIdToKeep, 'The wrong chapter was deleted.');
  });
});
