import { assert, expect } from 'chai';
import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { CombinedVueInstance } from 'vue/types/vue';

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/ConfirmationModal', () => {
  enum ButtonType {
    close,
    ok,
    cancel,
  }

  function findButton(
    wrapper: WrapperComplex,
    buttonType: ButtonType,
  ): Wrapper<Vue> {
    return wrapper.findAll('button').at(buttonType);
  }

  describe('User interaction', () => {
    let lastModalAction: string;
    let modalCount: number = 0;
    $.fn.extend({
      modal: (action: string) => {
        // For some reason, modal is not known during test run.
        // Hence we define it, so the test does not break.
        lastModalAction = action;
        modalCount++;
      },
    });

    it('Emits "ok" event when ok button is clicked.', () => {
      // Given
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
        },
      });
      const button = findButton(wrapper, ButtonType.ok);

      // When
      button.trigger('click');

      // Then
      expect(wrapper.emitted().ok.length).to.equal(1);
    });

    it('Emits "cancel" event when cancel button is clicked.', () => {
      // Given
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
        },
      });
      const button = findButton(wrapper, ButtonType.cancel);

      // When
      button.trigger('click');

      // Then
      expect(wrapper.emitted().cancel.length).to.equal(1);
    });

    it('Pressing ok closes the modal', () => {
      // Given
      const cacheModalCount = modalCount;
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
        },
      });
      const button = findButton(wrapper, ButtonType.ok);

      // When
      button.trigger('click');

      // Then
      expect(modalCount - cacheModalCount).to.be.equal(1);
    });
  });

  describe('User interface', () => {
    it('Text for buttons have default values.', () => {
      // Given
      const okText = 'OK';
      const cancelText = 'cancel';

      // When
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
        },
      });

      // Then
      const cancelButton = findButton(wrapper, ButtonType.cancel);
      const okButton = findButton(wrapper, ButtonType.ok);
      expect(cancelButton.text()).to.be.equal(cancelText);
      expect(okButton.text()).to.be.equal(okText);
    });
  });

  describe('Data binding', () => {
    it('Text for buttons can be set.', () => {
      // Given
      const okText = 'Yes';
      const cancelText = 'No';

      // When
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
          okText,
          cancelText,
        },
      });

      // Then
      const cancelButton = findButton(wrapper, ButtonType.cancel);
      const okButton = findButton(wrapper, ButtonType.ok);
      expect(cancelButton.text()).to.be.equal(cancelText);
      expect(okButton.text()).to.be.equal(okText);
    });

    it('Title for modal can be set.', () => {
      // Given
      const title = 'My Title';

      // When
      const wrapper = mount(ConfirmationModal, {
        propsData: {
          id: 'myId',
          title,
        },
      });

      // Then
      const titleElement = wrapper.find('.modal-title');
      expect(titleElement.text()).to.be.equal(title);
    });
  });
});
