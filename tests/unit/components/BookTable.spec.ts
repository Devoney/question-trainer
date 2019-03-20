import { assert, expect } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import sinon from 'sinon';
import $ from 'jquery';
import 'bootstrap';

import Book from '@/models/Book';
import BookTable from '@/components/BookTable.vue';
import ConfirmationModal from '@/components/confirmationModal.vue';

describe('component/BookTable', () => {
  describe('Data binding', () => {
    it('All books are shown in the table.', () => {
      // Given
      const books: Book[] = [
        new Book('id1', 'First book'),
        new Book('id2', 'Second book'),
        new Book('id3', 'Third book'),
      ];

      // When
      const wrapper = mount(BookTable, {
        propsData: {
          books,
        },
      });

      // Then
      const html = wrapper.html();
      for (let i = 0, l = books.length; i < l; i++) {
        const book = books[i];
        expect(html).to.have.string(book.title);
      }
    });
  });

  describe('User interaction', () => {
    it('Confirmation modal is shown when trash button of a book is clicked.', () => {
      // Given
      sinon.spy($.fn, 'modal');
      const wrapper = mount(BookTable, {
        propsData: {
          books: [
            new Book('book-id', 'Book title'),
          ],
        },
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');

      // When
      trashButton.trigger('click');

      // Then
      const spy = $.fn.modal as sinon.SinonSpy;
      assert.isTrue(spy.calledOnce);
      spy.restore();
    });

    it('Book is not deleted when trash button of a book is clicked.', () => {
      // Given
      const bookId: string = 'book-id';
      const wrapper = mount(BookTable, {
        propsData: {
          books: [
            new Book(bookId, 'Book title'),
          ],
        },
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');

      // When
      trashButton.trigger('click');

      // Then
      const books = wrapper.vm.$props.books as Book[];
      const book = books.find((b) => b.id === bookId);
      assert.isTrue(book !== undefined);
    });

    it('Book is deleted when action is confirmed.', () => {
      // Given
      const bookId: string = 'book-id';
      const wrapper = mount(BookTable, {
        propsData: {
          books: [
            new Book(bookId, 'Book title'),
          ],
        },
      });
      const trashButton = wrapper.find('button[aria-label="Trash book"]');
      const confirmationModal = wrapper.vm.$children[1] as ConfirmationModal;

      // When
      trashButton.trigger('click');
      confirmationModal.$emit('ok'); // Simulate that the user presses OK on the confirmation modal.

      // Then
      const books = wrapper.vm.$props.books as Book[];
      const book = books.find((b) => b.id === bookId);
      assert.isTrue(book === undefined, 'Book was still found in collection.');
      assert.isTrue(books.length === 0, 'The book table should have no books at all anymore.');
    });
  });
});
