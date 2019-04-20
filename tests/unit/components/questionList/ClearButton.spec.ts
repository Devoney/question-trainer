import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import ClearButton from '@/components/questionList/ClearButton.vue';
import MutationTypes from '@/state/MutationTypes';
import store from '@/state/store';
import sinon, { SinonSpy } from 'sinon';

describe('components/questionList/ClearButton', () => {
  it('Questions are cleared when button is clicked.', () => {
    // Given
    const wrapper = shallowMount(ClearButton, {
      store,
    });
    const button = wrapper.find('button');
    sinon.spy(store, 'commit');
    const spy = store.commit as SinonSpy;

    // When
    button.trigger('click');

    // Then
    assert.isTrue(spy.calledOnceWith(MutationTypes.QuestionList.clear), 'The mutation to clear the question list was not called on the store.');
    spy.restore();
    wrapper.destroy();
  });
});
