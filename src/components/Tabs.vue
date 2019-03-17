<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="tabPage in tabPages" class="nav-item" v-bind:key="tabPage.id">
        <a
          :class="['nav-link', {active: tabPage.active}]"
          data-toggle="tab"
          :href="'#'+ tabPage.id"
          role="tab"
          :aria-controls="tabPage.title"
        >{{ tabPage.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <slot>
        <tab-page title="Default tab page">Add tab pages by using 'tab-page' components.</tab-page>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import uuid from 'uuid/v1';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import TabPage from '@/components/TabPage.vue';

@Component
export default class Tabs extends Vue {
  private data(): any {
    return {
      tabPages: undefined,
    };
  }

  private mounted(): void {
    const tabPages = this.getTabPages();
    if (tabPages.length !== 0) {
      for (let i = 0; i < tabPages.length; i++) {
        tabPages[i].$data.active = (i === 0);
      }
    }
    this.$data.tabPages = tabPages;
  }

  private getTabPages(): TabPage[] {
    let tabPages: TabPage[];

    if (this.$slots.default === undefined) {
      tabPages = new Array<TabPage>();

      tabPages.push(new TabPage({
        propsData: {
          title: 'Default tab page',
        },
      }));

      return tabPages;
    }
    // @ts-ignore
    tabPages = this.$slots.default
      .map((vnode) => vnode.componentInstance)
      // @ts-ignore
      .filter((cmp) => !!cmp && cmp.$vnode.componentOptions.tag === 'tab-page');
    return tabPages;
  }
}
</script>