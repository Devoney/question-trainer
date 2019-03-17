<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="title in titles" class="nav-item" v-bind:key="title">
        <a
          :class="['nav-link', {active: title === activeTitle}]"
          data-toggle="tab"
          :href="'#'+ title.split(' ').join('')"
          role="tab"
          :aria-controls="title"
        >{{ title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <slot>Add components or HTML to the slot of the tab component.</slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import TabPage from '@/components/TabPage.vue';

@Component
export default class Tabs extends Vue {
  private data(): any {
    return {
      activeTitle: undefined,
      titles: new Array<string>(),
    };
  }

  private created(): void {
    const childComponents = this.$slots.default;
    if (childComponents === undefined) { return; }
    for (const child of childComponents) {
      if (child.componentOptions === undefined) { continue; }
      const componentType = child.componentOptions.tag;
      if (componentType === 'tab-page') {
        // @ts-ignore
        const title = child.componentOptions.propsData.title;
        if (this.$data.titles.length === 0) {
          this.$data.activeTitle = title;
        }
        this.$data.titles.push(title);
      }
    }
  }
}
</script>