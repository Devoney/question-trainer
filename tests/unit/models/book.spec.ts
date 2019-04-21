import { assert } from 'chai';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

describe('models/book', () => {
  it('All questions from book are obtained correctly.', () => {
    // Given
    const firstQuestion = new Question(uuid(), 'Question 1', 'Answer 1', '1');
    const secondQuestion = new Question(uuid(), 'Question 2', 'Answer 2', '2');
    const thirdQuestion = new Question(uuid(), 'Question 3', 'Answer 3', '3');
    const fourthQuestion = new Question(uuid(), 'Question 4', 'Answer 4', '4');

    const firstChapter = new Chapter(uuid(), '1', 'Chapter 1', [
      firstQuestion,
      secondQuestion,
    ]);
    const secondChapter = new Chapter(uuid(), '2', 'Chapter 2', [
      thirdQuestion,
      fourthQuestion,
    ]);
    const book = new Book(uuid(), 'Book title', [
      firstChapter,
      secondChapter,
    ]);
    const expectedQuestions = [
      firstQuestion,
      secondQuestion,
      thirdQuestion,
      fourthQuestion,
    ];

    // When
    const questionsFromBook = book.questions;

    // Then
    assert.deepEqual(questionsFromBook, expectedQuestions, 'Not all questions from the book are obtained.');
  });

  it('No chapter yields empty array of questions', () => {
    // Given
    const book = new Book(uuid(), 'My book title', undefined);

    // When
    const questions = book.questions;

    // Then
    assert.notEqual(questions, undefined);
    assert.equal(questions.length, 0, 'Array should be empty.');
  });
});
