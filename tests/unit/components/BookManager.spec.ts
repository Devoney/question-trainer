import _ from 'lodash';
import uuid from 'uuid/v1';
import { assert } from 'chai';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';

import Book from '@/models/Book';

import AddBook from '@/components/AddBook.vue';
import BookManager from '@/components/BookManager.vue';

describe('components/BookManager', () => {
  describe('User interaction', () => {
    it('A book is added upon add event.', () => {
      // Given
      const books: Book[] = [];
      const bookTitle: string = 'My book title';
      const wrapper = shallowMount(BookManager, {
        propsData: {
          books,
        },
      });
      const addBook = wrapper.vm.$refs.addBook as AddBook;

      // When
      addBook.$emit('add', bookTitle);

      // Then
      assert.equal(books.length, 1, 'The book should have been added, but was not.');
      const book = books[0];
      assert.isTrue(!_.isEmpty(book.id));
    });

    it('If title already exists, then book is not added.', () => {
      // Given
      const bookTitle: string = 'My book title';
      const guid = uuid();
      const books: Book[] = [new Book(guid, bookTitle)];

      const wrapper = shallowMount(BookManager, {
        propsData: {
          books,
        },
      });
      const addBook = wrapper.vm.$refs.addBook as AddBook;

      // When
      addBook.$emit('add', bookTitle);

      // Then
      assert.equal(books.length, 1, 'The book should not have been added.');
      const book = books[0];
      assert.equal(book.id, guid);
    });

    it('A book without a title is not added.', () => {
      [undefined, '', '     '].forEach((bookTitle) => {
        // Given
        const books: Book[] = [];

        const wrapper = shallowMount(BookManager, {
          propsData: {
            books,
          },
        });
        const addBook = wrapper.vm.$refs.addBook as AddBook;

        // When
        addBook.$emit('add', bookTitle);

        // Then
        assert.equal(books.length, 0, 'No book should have been added for title: `' + bookTitle + '`.');
      });
    });
  });

  describe('Data binding', () => {
    it('Books are shown', () => {
      // Given
      const books: Book[] = [
        new Book(uuid(), 'First title'),
        new Book(uuid(), 'Second title'),
        new Book(uuid(), 'Third title'),
      ];

      const wrapper = mount(BookManager, {
        propsData: {
          books,
        },
      });

      // When
      const html = wrapper.html();

      // Then
      books.forEach((book) => {
        assert.isTrue(html.indexOf(book.title) !== -1, 'Book ' + book.title + ' was not shown.');
      });
    });
  });
});
