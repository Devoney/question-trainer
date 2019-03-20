import _ from 'lodash';
import { assert } from 'chai';
import { shallowMount, Wrapper } from '@vue/test-utils';

import TabPage from '@/components/TabPage.vue';

describe('components/TabPage', () => {
  it('Id is automatically generated, once.', () => {
    // Given
    const wrapper = shallowMount(TabPage, {
      propsData: {
        title: 'Some tab',
      },
    });

    // When
    const id1 = wrapper.vm.$data.id;
    const id2 = wrapper.vm.$data.id;

    // Then
    assert.isFalse(_.isEmpty(id1), 'Id should have been generated');
    assert.equal(id1, id2, 'Id should only be generated once.');
  });
});
