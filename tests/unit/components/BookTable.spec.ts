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
});
