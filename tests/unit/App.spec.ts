import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import MutationTypes from '@/state/MutationTypes';
import store from '@/state/store';
import sinon from 'sinon';
import IState from '@/state/IState';
import { Store } from 'vuex';

describe('App', () => {
  it('When App starts it initializes the store.', () => {
    // Given
    const stubSubscribe = sinon.stub(store, 'subscribe');
    // @ts-ignore
    const stubCommit = sinon.stub(store, 'commit') as sinon.SinonStub;

    // When
    const wrapper = shallowMount(App, {
      store,
    });

    // Then
    assert.isTrue(stubCommit.calledOnceWith(MutationTypes.initialise));
    stubCommit.restore();
    stubSubscribe.restore();
    wrapper.destroy();
  });

  it('When App starts it calls subscribe on the store.', () => {
    // Given
    // @ts-ignore
    const stubSubscribe = sinon.stub(store, 'subscribe') as sinon.SinonStub;
    const stubCommit = sinon.stub(store, 'commit');

    // When
    const wrapper = shallowMount(App, {
      store,
    });

    // Then
    assert.isTrue(stubSubscribe.calledOnce);
    stubCommit.restore();
    stubSubscribe.restore();
    wrapper.destroy();
  });
});
