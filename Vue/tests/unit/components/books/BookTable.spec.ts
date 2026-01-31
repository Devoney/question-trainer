import { assert, expect } from 'chai';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import bus from '@/MessageBus';
import store from '@/state/store';
import sinon from 'sinon';
import $ from 'jquery';
import 'bootstrap';

import Book from '@/models/Book';
import BookTable from '@/components/books/BookTable.vue';
import ConfirmationModal from '@/components/confirmationModal.vue';
import QuestionModalArgs from '@/types/QuestionModalArgs';

describe('component/books/BookTable', () => {
  describe('Data binding', () => {
    it('All books are shown in the table.', () => {
      // Given
      const books: Book[] = [
        new Book('id1', 'First book'),
        new Book('id2', 'Second book'),
        new Book('id3', 'Third book'),
      ];
      store.state.books = books;

      // When
      const wrapper = mount(BookTable, {
        store,
      });

      // Then
      const html = wrapper.html();
      for (let i = 0, l = books.length; i < l; i++) {
        const book = books[i];
        expect(html).to.have.string(book.title);
      }
      wrapper.destroy();
    });
  });

  describe('User interaction', () => {
    it('Message to show confirmation modal is send when trash button of a book is clicked.', () => {
      // Given
      store.state.books = [
        new Book('book-id', 'Book title'),
      ];
      const wrapper = mount(BookTable, {
        store,
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');
      let modalArgs: QuestionModalArgs | undefined;
      bus.onShowQuestionModal((args) => {
        modalArgs = args;
      });

      // When
      trashButton.trigger('click');

      // Then
      assert.notEqual(modalArgs, undefined, 'It seems the modal message was never sent.');
      // @ts-ignore
      assert.equal('Are you sure you want to delete this book?', modalArgs.text);
      wrapper.destroy();
    });

    it('Book is not deleted when trash button of a book is clicked.', () => {
      // Given
      const bookId: string = 'book-id';
      store.state.books = [
        new Book(bookId, 'Book title'),
      ];
      const wrapper = mount(BookTable, {
        store,
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');

      // When
      trashButton.trigger('click');

      // Then
      const books = store.state.books as Book[];
      const book = books.find((b) => b.id === bookId);
      assert.isTrue(book !== undefined);
      wrapper.destroy();
    });

    it('Book is deleted when action is confirmed.', () => {
      // Given
      const bookId: string = 'book-id';
      store.state.books = [
        new Book(bookId, 'Book title'),
      ];
      const wrapper = mount(BookTable, {
        store,
      });
      let modalArgs: QuestionModalArgs | undefined;
      bus.onShowQuestionModal((args) => {
        modalArgs = args;
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');

      // When
      trashButton.trigger('click');
      if (modalArgs !== undefined) {
        (modalArgs as QuestionModalArgs).okHandler();
      }

      // Then
      const books = store.state.books as Book[];
      const book = books.find((b) => b.id === bookId);
      assert.isTrue(book === undefined, 'Book was still found in collection.');
      assert.isTrue(books.length === 0, 'The book table should have no books at all anymore.');
      wrapper.destroy();
    });
  });
});
