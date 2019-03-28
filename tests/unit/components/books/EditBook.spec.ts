import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import EditBook from '@/components/books/EditBook.vue';
import store from '@/state/store';
import Book from '@/models/Book';

describe('components/books/EditBook', () => {
  it('Book title is changed when saved.', () => {
    // Given
    const bookTitle = 'My title';
    const newTitle = 'New title';
    const book = new Book('id', bookTitle);
    store.state.bookEdited = book;
    const wrapper = mount(EditBook, {
      store,
    });
    const titleInput = wrapper.find('input');
    titleInput.setValue(newTitle);
    const saveButton = wrapper.find('button');

    // When
    saveButton.trigger('click');

    // Then
    assert.equal(book.title, newTitle, 'The title was not saved on the book.');
  });

  it('Book title is not changed when cancelled.', () => {
    // Given
    const bookTitle = 'My title';
    const newTitle = 'New title';
    const book = new Book('id', bookTitle);
    store.state.bookEdited = book;
    const wrapper = mount(EditBook, {
      store,
    });
    const titleInput = wrapper.find('input');
    titleInput.setValue(newTitle);
    const saveButton = wrapper.find('button');

    // When
    saveButton.trigger('keydown.esc');

    // Then
    assert.equal(book.title, bookTitle, 'The title was not saved on the book.');
  });

  it('Book title is not changed when title is already in use for another book.', () => {
    // Given
    const bookTitle = 'My title';
    const newTitle = 'New title';
    const book = new Book('id', bookTitle);
    store.state.bookEdited = book;
    store.state.books = [
      book,
      new Book('Some other id', newTitle),
    ];
    const wrapper = mount(EditBook, {
      store,
    });
    const titleInput = wrapper.find('input');
    titleInput.setValue(newTitle);
    const saveButton = wrapper.find('button');

    // When
    saveButton.trigger('click');

    // Then
    assert.equal(book.title, bookTitle, 'The title was not supposed to be saved.');
  });
});
