import { assert, expect } from 'chai';
import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { CombinedVueInstance } from 'vue/types/vue';

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/ConfirmationModal', () => {
  describe('User interaction', () => {
    it('Emits "ok" event when ok button is clicked.', () => {
      assert(false,'TODO');
    });

    it('Emits "cancel" event when cancel button is clicked.', () => {
      assert(false,'TODO');
    });

    it('Pressing ok closes the modal', () => {
      assert(false,'TODO');
    });
  });
  describe('User interface', () => {
    it('Text for buttons have default values.', () => {
      assert(false,'TODO');
    });

    it('Text for buttons can be set.', () => {
      assert(false,'TODO');
    });

    it('Title for modal can be set.', () => {
      assert(false,'TODO');
    });
  });
});
