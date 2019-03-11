import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';

import AddBook from '@/components/AddBook.vue';

describe('', () => {
  describe('components/AddBook', () => {
    it('When user presses add button, without title, no event is raised.', () => {
      // Given
      const wrapper = mount(AddBook);
      const addButton = wrapper.find('button');

      // When
      addButton.trigger('click');

      // Then
      const addEvents = wrapper.emitted().add;
      assert.equal(addEvents, undefined);
    });

    it('When user presses add button, with title, add event is raised with book title as argument.', () => {
      // Given
      const wrapper = mount(AddBook);
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
    });

    it('When user adds book, the title is emptied.', () => {
      // Given
      const wrapper = mount(AddBook);
      const addButton = wrapper.find('button');
      const input = wrapper.find('input');
      const bookTitle: string = 'My book title';

      // When
      input.setValue(bookTitle);
      assert.notEqual(wrapper.vm.$data.bookTitle, undefined);
      addButton.trigger('click');

      // Then
      assert.equal(wrapper.vm.$data.bookTitle, undefined);
      assert.isEmpty((input.element as HTMLInputElement).value);
    });
  });
});
