import _ from 'lodash';
import uuid from 'uuid/v1';
import { assert } from 'chai';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import store from '@/state/store';
import Book from '@/models/Book';

import AddBook from '@/components/books/AddBook.vue';
import BookManager from '@/components/books/BookManager.vue';

describe('components/books/BookManager', () => {
  describe('User interaction', () => {
    it('A book is added upon add event.', () => {
      // Given
      store.state.books = [];
      const bookTitle: string = 'My book title';
      const wrapper = shallowMount(BookManager, {
        store,
      });
      const addBook = wrapper.vm.$refs.addBook as AddBook;

      // When
      addBook.$emit('add', bookTitle);

      // Then
      assert.equal(store.state.books.length, 1, 'The book should have been added, but was not.');
      const book = store.state.books[0];
      assert.isTrue(!_.isEmpty(book.id));
      wrapper.destroy();
    });

    it('If title already exists, then book is not added.', () => {
      // Given
      const bookTitle: string = 'My book title';
      const guid = uuid();
      store.state.books = [new Book(guid, bookTitle)];

      const wrapper = shallowMount(BookManager, {
        store,
      });
      const addBook = wrapper.vm.$refs.addBook as AddBook;

      // When
      addBook.$emit('add', bookTitle);

      // Then
      assert.equal(store.state.books.length, 1, 'The book should not have been added.');
      const book = store.state.books[0];
      assert.equal(book.id, guid);
      wrapper.destroy();
    });

    it('A book without a title is not added.', () => {
      [undefined, '', '     '].forEach((bookTitle) => {
        // Given
        store.state.books = [];

        const wrapper = shallowMount(BookManager, {
          store,
        });
        const addBook = wrapper.vm.$refs.addBook as AddBook;

        // When
        addBook.$emit('add', bookTitle);

        // Then
        assert.equal(store.state.books.length, 0, 'No book should have been added for title: `' + bookTitle + '`.');
        wrapper.destroy();
      });
    });
  });

  describe('Data binding', () => {
    it('Books are shown', () => {
      // Given
      store.state.books = [
        new Book(uuid(), 'First title'),
        new Book(uuid(), 'Second title'),
        new Book(uuid(), 'Third title'),
      ];

      const wrapper = mount(BookManager, {
        store,
      });

      // When
      const html = wrapper.html();

      // Then
      store.state.books.forEach((book) => {
        assert.isTrue(html.indexOf(book.title) !== -1, 'Book ' + book.title + ' was not shown.');
      });
    });
  });
});
