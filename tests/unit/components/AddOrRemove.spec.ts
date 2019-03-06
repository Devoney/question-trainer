import { expect } from 'chai';
import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import AddOrRemove from './../../../src/components/AddOrRemove.vue';
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
      const wrapper = mount(AddOrRemove);
      const button = findRemoveButton(wrapper);
      button.trigger('click');
      expect(wrapper.emitted().remove.length).to.equal(1);
    });

    it('Emits "add" event when add button is clicked.', () => {
      const wrapper = mount(AddOrRemove);
      const button = findAddButton(wrapper);
      button.trigger('click');
      expect(wrapper.emitted().add.length).to.equal(1);
    });
  });

  describe('Title', () => {
    it('Sets default title on add button.', () => {
      const defaultTitle = 'Add';
      const wrapper = mount(AddOrRemove);
      const button = findAddButton(wrapper);
      expect(button.attributes('title')).to.be.equal(defaultTitle);
    });

    it('Sets title on add button when specified.', () => {
      const addToText = 'My non default text on add button';
      const wrapper = mount(AddOrRemove, {
        propsData: {
          addToText
        }
      });
      const button = findAddButton(wrapper);
      expect(button.attributes('title')).to.be.equal(addToText);
    });

    it('Sets default title on remove button.', () => {
      const defaultTitle = 'Remove';
      const wrapper = mount(AddOrRemove);
      const button = findRemoveButton(wrapper);
      expect(button.attributes('title')).to.be.equal(defaultTitle);
    });

    it('Sets title on remove button when specified.', () => {
      const removeFromText = 'My non default text on remove button';
      const wrapper = mount(AddOrRemove, {
        propsData: {
          removeFromText
        }
      });
      const button = findRemoveButton(wrapper);
      expect(button.attributes('title')).to.be.equal(removeFromText);
    });
  });
});
