import _ from 'lodash';
import { assert } from 'chai';
import MutationTypes from '@/state/MutationTypes';
import store from '@/state/store';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

describe('state/store', () => {
  it('Adding a book', () => {
    // Given
    store.state.books = [];
    const book = new Book('book-ida', 'My title');

    // When
    store.commit(MutationTypes.Book.addBook, book);

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
    store.commit(MutationTypes.Chapter.addChapter, chapter);

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
    store.commit(MutationTypes.Chapter.editChapter, updateValue);

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
    store.commit(MutationTypes.Book.removeBookById, bookIdToRemove);

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
    store.commit(MutationTypes.Chapter.removeChapterById, chapterIdToRemove);

    // Then
    assert.equal(firstBook.chapters.length, 2, 'Chapter got removed on the wrong book.');
    assert.equal(secondBook.chapters.length, 1, 'Chapter was not deleted on selected book.');
    const chapterKept = secondBook.chapters[0];
    assert.equal(chapterKept.id, chapterIdToKeep, 'The wrong chapter was deleted.');
  });

  it('A collection of books is set on the store.', () => {
    // Given
    store.state.books = [];
    const firstBook = new Book('book-1', 'First book');
    const secondBook = new Book('book-2', 'Second book');

    // When
    store.commit(MutationTypes.Book.setBooks, [firstBook, secondBook]);

    // Then
    assert.equal(store.state.books.length, 2, 'Incorrect number of books are set in the store.');
    assert.equal(store.state.books[0].id, firstBook.id, 'The order of books is unexpected.');
    assert.equal(store.state.books[1].id, secondBook.id, 'The order of books is unexpected.');
  });

  it('Correct book is set for editing.', () => {
    // Given
    const book = new Book('book-id', 'My title');

    // When
    store.commit(MutationTypes.Book.setEditedBook, book);

    // Then
    // @ts-ignore
    assert.equal(store.state.bookEdited.id, book.id, 'Wrong book is being edited.');
  });

  it('Correct chapter is set for editing.', () => {
    // Given
    const chapter = new Chapter('chapter-id', 'nr', 'My chapter');

    // When
    store.commit(MutationTypes.Chapter.setEditedChapter, chapter);

    // Then
    // @ts-ignore
    assert.equal(store.state.chapterEdited.id, chapter.id, 'Wrong chapter is set for editing.');
  });

  it('Correct book is set as selected.', () => {
    // Given
    const book = new Book('book-id', 'My title');

    // When
    store.commit(MutationTypes.Book.setSelectedBook, book);

    // Then
    // @ts-ignore
    assert.equal(store.state.bookSelected.id, book.id, 'Wrong book has been set as selected.');
  });

  it('Book title is altered.', () => {
    // Given
    const book = new Book('book-id', 'My title');
    store.state.bookEdited = book;
    const title: string = 'Altered title';

    // When
    store.commit(MutationTypes.Book.editBook, title);

    // Then
    assert.equal(book.title, title, 'Title of book should have been altered.');
  });

  it('Question is added', () => {
    // Given
    const chapter = new Chapter('chapter-id', 'nr', 'My chapter', [
      new Question(uuid(), 'My question', 'My answer', '1'),
    ]);
    store.state.chapterSelected = chapter;
    const questionId = uuid();
    const question = new Question(questionId, 'My second question', 'My second answer', '2');

    // When
    store.commit(MutationTypes.Question.addQuestion, question);

    // Then
    assert.equal(chapter.questions.length, 2, 'The question was not added.');
    const secondQuestion = chapter.questions[1];
    assert.equal(secondQuestion.id, questionId, 'The order of questions is unexpected or the question was added incorrectly.');
  });


  it('Question is removed', () => {
    // Given
    const idToRemove = uuid();
    const idToKeep = uuid();
    assert.notEqual(idToKeep, idToRemove, 'Test is flawed.');
    const question = new Question(idToRemove, 'My question', 'My answer', '1');
    const chapter = new Chapter(uuid(), 'Nr', 'Chapter title', [
      question,
      new Question(idToKeep, 'My other question', 'My other answer', '2'),
    ]);
    store.state.chapterSelected = chapter;

    // When
    store.commit(MutationTypes.Question.removeQuestionById, idToRemove);

    // Then
    assert.equal(chapter.questions.length, 1, 'The question should have been removed.');
    const firstQuestion = chapter.questions[0];
    assert.equal(firstQuestion.id, idToKeep, 'The wrong question has been deleted.');
  });

  it('Question is edited.', () => {
    // Given
    const id = uuid();
    const question = new Question(id, 'My question', 'My answer', '1');
    store.state.questionEdited = question;
    const editedQuestion = new Question('1', 'A different question', 'A different answer', '2');

    // When
    store.commit(MutationTypes.Question.editQuestion, editedQuestion);

    // Then
    assert.equal(question.id, id, 'The id has changed. The id should not change.');
    assert.equal(question.question, editedQuestion.question, 'The question was not updated.');
    assert.equal(question.answer, editedQuestion.answer, 'The answer was not updated.');
    assert.equal(question.pageNr, editedQuestion.pageNr, 'The pageNr was not updated.');
  });

  it('Question is set for editing', () => {
    // Given
    const id = uuid();
    const question = new Question(id, 'My question', 'My answer', '1');
    store.state.questionEdited = undefined;

    // When
    store.commit(MutationTypes.Question.setEditedQuestion, question);

    // Then
    assert.notEqual(store.state.questionEdited, undefined, 'The question was not set for editing.');
    // @ts-ignore
    assert.equal(store.state.questionEdited.id, id, 'The wrong question was set for editing or the question got malformed.');
  });

  it('Question is removed from list', () => {
    // Given
    const firstQuestion = new Question(uuid(), 'First question', 'First answer', '1');
    const secondQuestion = new Question(uuid(), 'Second question', 'Second answer', '2');
    const thirdQuestion = new Question(uuid(), 'Third question', 'Third answer', '3');
    store.state.questionList = [
      firstQuestion,
      secondQuestion,
      thirdQuestion,
    ];

    // When
    store.commit(MutationTypes.QuestionList.removeFromList, secondQuestion);

    // Then
    assert.equal(store.state.questionList.length, 2, 'The question has not been removed.');
    const index = _.findIndex(store.state.questionList, (q) => {
      return q.id === secondQuestion.id;
    });
    assert.equal(index, -1, 'The wrong question has been deleted.');
  });

  it('Question is added to the list.', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'Question', 'Answer', '1');

    // When
    store.commit(MutationTypes.QuestionList.addToList, question);

    // Then
    assert.equal(store.state.questionList.length, 1, 'The question was not added to the list.');
  });

  it('Question is not added to the list twice.', () => {
    // Given
    const question = new Question(uuid(), 'Question', 'Answer', '1');
    store.state.questionList = [
      question,
    ];

    // When
    store.commit(MutationTypes.QuestionList.addToList, question);

    // Then
    assert.equal(store.state.questionList.length, 1, 'The question should not be added to the list twice.');
  });
});
