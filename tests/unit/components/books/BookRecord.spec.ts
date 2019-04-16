import _ from 'lodash';
import BookRecord from '@/components/books/BookRecord.vue';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import { assert, expect } from 'chai';
import Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import { mount, Wrapper } from '@vue/test-utils';
import store from '@/state/store';
import '@/font-awesome';
import uuid from 'uuid/v1';

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/books/BookRecord', () => {
  function getBook(): Book {
    return new Book('my-book-id', 'My book', [
      new Chapter('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3a', 'Chapter #1', 'First chapter', [
        new Question(uuid(), 'First question', 'First answer', '1'),
        new Question(uuid(), 'Second question', 'Second answer', '1'),
      ]),
      new Chapter('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3b', 'Chapter #2', 'Second chapter', [
        new Question(uuid(), 'Third question', 'Third answer', '1'),
        new Question(uuid(), 'Fourth question', 'Fourth answer', '1'),
      ]),
    ]);
  }

  describe('Data binding', () => {
    it('Index is correctly shown.', () => {
      // Given
      const index: number = 1;

      // When
      const wrapper = mount(BookRecord, {
        propsData: {
          book: getBook(),
          index,
        },
        store,
      });

      // Then
      const element = wrapper.find('[aria-label="Index"]');
      expect(element.text()).to.be.equal(index.toString());
    });

    it('Book title is correctly shown.', () => {
      // Given
      const book = getBook();

      // When
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
        store,
      });

      // Then
      const element = wrapper.find('[aria-label="Title of book"]');
      expect(element.text()).to.be.equal(book.title);
    });

    it('Number of chapters is correctly shown.', () => {
      // Given
      const expectedNrOfChapters: number = 2;

      // When
      const wrapper = mount(BookRecord, {
        propsData: {
          book: getBook(),
        },
        store,
      });

      // Then
      const element = wrapper.find('[aria-label="Number of chapters"]');
      expect(element.text()).to.be.equal(expectedNrOfChapters.toString());
    });

    it('Number of questions is correctly shown.', () => {
      // Given
      const expectedNrOfQuestions: number = 4;

      // When
      const wrapper = mount(BookRecord, {
        propsData: {
          book: getBook(),
        },
        store,
      });

      // Then
      const element = wrapper.find('[aria-label="Number of questions"]');
      expect(element.text()).to.be.equal(expectedNrOfQuestions.toString());
    });
  });

  describe('User interaction', () => {
    it('All questions in book are added to question list when add button is clicked.', () => {
      // Given
      store.state.questionList = [];
      const book = getBook();
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
        store,
      });
      const addButton = wrapper.find('button[aria-label="add"]');

      // When
      addButton.trigger('click');

      // Then
      assert.equal(store.state.questionList.length, 4, 'An equivalent number of questions in the book should have been added to the question list.');
    });

    it('All questions in the book are removed from the question list.', () => {
      // Given
      const book = getBook();
      const questionsFromBook = _.flatMap(_.map(book.chapters, (chapter) => {
        return chapter.questions;
      }));
      const question = new Question(uuid(), 'My question', 'My answer', '6');
      store.state.questionList = _.concat(questionsFromBook, [question]);
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
        store,
      });
      const removeButton = wrapper.find('button[aria-label="remove"]');

      // When
      removeButton.trigger('click');

      // Then
      assert.equal(store.state.questionList.length, 1, 'The questions from the book have not been removed from the question list.');
      const singleQuestion = store.state.questionList[0];
      assert.equal(
        singleQuestion.id,
        question.id,
        'The question that was not in the book, that should not have been removed, seems to have been removed.',
      );
      wrapper.destroy();
    });

    it('Trash event is raised when trash button is clicked, with id of book as argument.', () => {
      // Given
      const book = getBook();
      const expectedEventArgs: string[] = [book.id];
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
        store,
      });
      const button = wrapper.find('[aria-label="Trash book"]');

      // When
      button.trigger('click');

      // Then
      const event = wrapper.emitted().trash;
      expect(event.length).to.be.equal(1);
      const actualEventArgs = event[0];
      expect(actualEventArgs).to.be.deep.equal(expectedEventArgs);
      wrapper.destroy();
    });
  });
});
