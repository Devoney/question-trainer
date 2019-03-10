import { assert, expect } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';

import Book from '@/models/Book';
import BookTable from '@/components/BookTable.vue';

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
      let lastModalAction: string;
      let modalCount: number = 0;
      delete $.fn.modal;
      $.fn.extend({
        modal: (action: string) => {
          // For some reason, modal is not known during test run.
          // Hence we define it, so the test does not break.
          lastModalAction = action;
          modalCount++;
        },
      });

      const cacheModalCount: number = modalCount;
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
      expect(modalCount - cacheModalCount).to.be.equal(1);
    });

    // it('Book is not deleted when trash button of a book is clicked.', () => {
    //   // Given
    //   // When
    //   // Then
    //   assert.isTrue(false, 'TODO');
    // });

    // it('Book is deleted when action is confirmed.', () => {
    //   // Given
    //   // When
    //   // Then
    //   assert.isTrue(false, 'TODO');
    // });
  });
});
