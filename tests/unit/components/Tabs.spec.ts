import { assert } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Tabs from '@/components/Tabs.vue';
import TabPage from '@/components/TabPage.vue';

describe('components/Tabs', () => {
  describe('User interface', () => {
    it('First tab-page is set to active, when no tab was set to active.', () => {
      // Given
      const localVue = createLocalVue();
      localVue.component('tab-page', TabPage);
      const wrapper = shallowMount(Tabs, {
        localVue,
        slots: {
          default: [
            '<tab-page title="First tab">My content</tab-page>',
            '<tab-page title="Second tab">My content</tab-page>',
          ],
        },
      });

      // When
      // @ts-ignore
      const tabPages: TabPage[] = wrapper.vm.$slots.default
      .map((vnode) => vnode.componentInstance)
      // @ts-ignore
      .filter((cmp) => !!cmp && cmp.$vnode.componentOptions.tag === 'tab-page');


      // Then
      const firstTabPage = tabPages[0];
      const secondTabPage = tabPages[1];
      assert.isTrue(firstTabPage.$data.active, 'The first tab page should have been set to active.');
      assert.isFalse(secondTabPage.$data.active, 'The second tab page should have been set to inactive.');
      wrapper.destroy();
    });

    it('When second tab is set to active, no other tab is set to active.', () => {
      // Given
      const localVue = createLocalVue();
      localVue.component('tab-page', TabPage);
      const wrapper = shallowMount(Tabs, {
        localVue,
        slots: {
          default: [
            '<tab-page title="First tab">My content</tab-page>',
            '<tab-page title="Second tab" :is-default="true">My content</tab-page>',
          ],
        },
      });

      // When
      // @ts-ignore
      const tabPages: TabPage[] = wrapper.vm.$slots.default
      .map((vnode) => vnode.componentInstance)
      // @ts-ignore
      .filter((cmp) => !!cmp && cmp.$vnode.componentOptions.tag === 'tab-page');


      // Then
      const firstTabPage = tabPages[0];
      const secondTabPage = tabPages[1];
      assert.isFalse(firstTabPage.$data.active, 'The first tab page should have been set to inactive.');
      assert.isTrue(secondTabPage.$data.active, 'The second tab page should have been set to active.');
      wrapper.destroy();
    });

    it('Titles are shown for tab-pages', () => {
      // Given
      const localVue = createLocalVue();
      const titles: string[] = ['Books', 'Chapters'];
      localVue.component('tab-page', TabPage);
      const wrapper = shallowMount(Tabs, {
        localVue,
        slots: {
          default: [
            '<tab-page title="' + titles[0] + '">Some content</tab-page>',
            '<tab-page title="' + titles[1] + '">Some other content</tab-page>',
          ],
        },
      });

      // When
      const html = wrapper.html();

      // Then
      for (const title of titles) {
        assert.isTrue(html.indexOf(title) !== -1, 'Title \'' + title + '\ should have been in the HTML.');
      }
      wrapper.destroy();
    });
  });
});
