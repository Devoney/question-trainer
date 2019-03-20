import BookRecord from '@/components/BookRecord.vue';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import { assert, expect } from 'chai';
import Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import { mount, Wrapper } from '@vue/test-utils';

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/BookRecord', () => {
  function getBook(): Book {
    return new Book('my-book-id', 'My book', [
      new Chapter('Chapter #1', 'First chapter', [
        new Question('First question', 'First answer', 1),
        new Question('Second question', 'Second answer', 1),
      ]),
      new Chapter('Chapter #2', 'Second chapter', [
        new Question('Third question', 'Third answer', 1),
        new Question('Fourth question', 'Fourth answer', 1),
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
      });

      // Then
      const element = wrapper.find('[aria-label="Number of questions"]');
      expect(element.text()).to.be.equal(expectedNrOfQuestions.toString());
    });
  });

  describe('User interaction', () => {
    it('Add event is raised when add button is clicked, with id of book as argument.', () => {
      // Given
      const book = getBook();
      const expectedEventArgs: string[] = [book.id];
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
      });
      const addButton = wrapper.find('button[aria-label="add"]');

      // When
      addButton.trigger('click');

      // Then
      const event = wrapper.emitted().add;
      expect(event.length).to.be.equal(1);
      const actualEventArgs = event[0];
      expect(actualEventArgs).to.be.deep.equal(expectedEventArgs);
    });

    it('Remove event is raised when remove button is clicked, with id of book as argument.', () => {
      // Given
      const book = getBook();
      const expectedEventArgs: string[] = [book.id];
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
      });
      const removeButton = wrapper.find('button[aria-label="remove"]');

      // When
      removeButton.trigger('click');

      // Then
      const event = wrapper.emitted().remove;
      expect(event.length).to.be.equal(1);
      const actualEventArgs = event[0];
      expect(actualEventArgs).to.be.deep.equal(expectedEventArgs);
    });

    it('Trash event is raised when trash button is clicked, with id of book as argument.', () => {
      // Given
      const book = getBook();
      const expectedEventArgs: string[] = [book.id];
      const wrapper = mount(BookRecord, {
        propsData: {
          book,
        },
      });
      const button = wrapper.find('[aria-label="Trash book"]');

      // When
      button.trigger('click');

      // Then
      const event = wrapper.emitted().trash;
      expect(event.length).to.be.equal(1);
      const actualEventArgs = event[0];
      expect(actualEventArgs).to.be.deep.equal(expectedEventArgs);
    });
  });
});
