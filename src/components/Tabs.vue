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
import _ from 'lodash';
import uuid from 'uuid/v1';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import TabPage from '@/components/TabPage.vue';

@Component
export default class Tabs extends Vue {
  private tabPages: TabPage[] = [];

  private mounted(): void {
    const tabPages = this.getTabPages();
    this.setActiveTabPage(tabPages);
    this.tabPages = tabPages;
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

  private hasActiveTabPage(tabPages: TabPage[]): boolean {
    return _.findIndex(tabPages, (tabPage) => {
      return tabPage.active === true;
    }) !== -1;
  }

  private setActiveTabPage(tabPages: TabPage[]): void {
    if (tabPages.length === 0) { return; }

    if (this.hasActiveTabPage(tabPages)) {
      return;
    }

    for (let i = 0; i < tabPages.length; i++) {
      tabPages[i].active = (i === 0);
    }
  }
}
</script>