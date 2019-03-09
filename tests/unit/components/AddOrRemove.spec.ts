import { expect } from 'chai';
import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import AddOrRemove from '@/components/AddOrRemove.vue';
import { CombinedVueInstance } from 'vue/types/vue';

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/AddOrRemove', () => {
  function findAddButton(wrapper: WrapperComplex): Wrapper<Vue> {
    return wrapper.findAll('button').at(1);
  }

  function findRemoveButton(wrapper: WrapperComplex): Wrapper<Vue> {
    return wrapper.findAll('button').at(0);
  }

  describe('User interaction', () => {
    it('Emits "remove" event when remove button is clicked.', () => {
      // Given
      const wrapper = mount(AddOrRemove);
      const button = findRemoveButton(wrapper);

      // When
      button.trigger('click');

      // Then
      expect(wrapper.emitted().remove.length).to.equal(1);
    });

    it('Emits "add" event when add button is clicked.', () => {
      // Given
      const wrapper = mount(AddOrRemove);
      const button = findAddButton(wrapper);

      // When
      button.trigger('click');

      // Then
      expect(wrapper.emitted().add.length).to.equal(1);
    });
  });

  describe('User interface', () => {
    function verifyStyleColor(button: Wrapper<Vue>, color: string) {
      const svg = button.find('svg');
      const style = svg.attributes('style');
      expect(style).to.be.equal('color: ' + color + ';');
    }

    it('Icons are colored as specified, separately.', () => {
      // Given
      const removeColor = 'red';
      const addColor = 'blue';

      // When
      const wrapper = mount(AddOrRemove, {
        propsData: {
          removeColor,
          addColor,
        },
      });

      // Then
      const removeButton = findRemoveButton(wrapper);
      verifyStyleColor(removeButton, removeColor);
      const addButton = findAddButton(wrapper);
      verifyStyleColor(addButton, addColor);
    });
  });

  describe('Data binding', () => {
    it('Sets default title on add button.', () => {
      // Given
      const defaultTitle = 'Add';

      // When
      const wrapper = mount(AddOrRemove);

      // Then
      const button = findAddButton(wrapper);
      expect(button.attributes('title')).to.be.equal(defaultTitle);
    });

    it('Sets title on add button when specified.', () => {
      // Given
      const addToText = 'My non default text on add button';

      // When
      const wrapper = mount(AddOrRemove, {
        propsData: {
          addToText,
        },
      });

      // Then
      const button = findAddButton(wrapper);
      expect(button.attributes('title')).to.be.equal(addToText);
    });

    it('Sets default title on remove button.', () => {
      // Given
      const defaultTitle = 'Remove';

      // When
      const wrapper = mount(AddOrRemove);

      // Then
      const button = findRemoveButton(wrapper);
      expect(button.attributes('title')).to.be.equal(defaultTitle);
    });

    it('Sets title on remove button when specified.', () => {
      // Given
      const removeFromText = 'My non default text on remove button';

      // When
      const wrapper = mount(AddOrRemove, {
        propsData: {
          removeFromText,
        },
      });

      // Then
      const button = findRemoveButton(wrapper);
      expect(button.attributes('title')).to.be.equal(removeFromText);
    });
  });
});
