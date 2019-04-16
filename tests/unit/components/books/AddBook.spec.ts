import { assert } from 'chai';
import {shallowMount, Wrapper } from '@vue/test-utils';

import AddBook from '@/components/books/AddBook.vue';

describe('components/books/AddBook', () => {
  describe('User interaction', () => {
    it('When user presses add button, without title, no event is raised.', () => {
      // Given
      const wrapper = shallowMount(AddBook);
      const addButton = wrapper.find('button');

      // When
      addButton.trigger('click');

      // Then
      const addEvents = wrapper.emitted().add;
      assert.equal(addEvents, undefined);
      wrapper.destroy();
    });

    it('When user presses add button, with title, add event is raised with book title as argument.', () => {
      // Given
      const wrapper = shallowMount(AddBook);
      const addButton = wrapper.find('button');
      const input = wrapper.find('input');
      const bookTitle: string = 'My book title';
      // When
      input.setValue(bookTitle);
      addButton.trigger('click');

      // Then
      const addEvents = wrapper.emitted().add;
      assert.equal(addEvents.length, 1);
      const eventArg = addEvents[0][0] as string;
      assert.equal(eventArg, bookTitle);
      wrapper.destroy();
    });

    it('When user adds book, the title is emptied.', () => {
      // Given
      const wrapper = shallowMount(AddBook);
      const addButton = wrapper.find('button');
      const input = wrapper.find('input');
      const bookTitle: string = 'My book title';

      // When
      input.setValue(bookTitle);
      assert.notEqual(wrapper.vm.$data.bookTitle, undefined);
      addButton.trigger('click');

      // Then
      assert.equal(wrapper.vm.$data.bookTitle, '');
      assert.isEmpty((input.element as HTMLInputElement).value);
      wrapper.destroy();
    });

    it('When error message is set, but book title is not, then the error message is not shown.', () => {
      // Given
      const errMessage: string = 'My custom error message';
      const wrapper = shallowMount(AddBook, {
        propsData: {
          errMessage,
        },
      });

      // When
      wrapper.vm.$data.bookTitle = undefined;

      // Then
      const html = wrapper.html();
      const hasErrorMessage: boolean = html.indexOf(errMessage) !== -1;
      assert.isFalse(hasErrorMessage, html);
      wrapper.destroy();
    });

    it('When error message is set, and book title also, then the error message is shown.', () => {
      // Given
      const errMessage: string = 'My custom error message';
      const wrapper = shallowMount(AddBook, {
        propsData: {
          errMessage,
        },
      });

      // When
      wrapper.vm.$data.bookTitle = 'Some book title.';

      // Then
      const html = wrapper.html();
      const hasErrorMessage: boolean = html.indexOf(errMessage) !== -1;
      assert.isTrue(hasErrorMessage, html);
      wrapper.destroy();
    });
  });
});
