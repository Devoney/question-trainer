<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="(tab, index) in tabs" class="nav-item">
        <a
          @click="setActiveTab(tab)"
          :class="['nav-link', { 'active': tab === activeTab }]"
          data-toggle="tab"
          :href="'#'+ tab.title"
          role="tab"
          :aria-controls="tab.title"
          :aria-selected="tab === activeTab"
        >{{ tab.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs" :class="['tab-pane', { 'active': tab === activeTab, 'show':  tab === activeTab}]" :id="tab.title" role="tabpanel">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="tab-content bordered">
              <component :is="tabs[index].component" v-bind="tab.props"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import BookManager from '@/components/BookManager.vue';

import Tab from '@/types/Tab';

@Component
export default class Tabs extends Vue {
  @Prop({ default: () => new Array<Tab>() }) private tabs!: Tab[];

  private data(): any {
    return {
      activeTab: undefined,
    };
  }

  private created(): void {
    this.$data.activeTab = this.tabs[0];
  }

  private setActiveTab(tab: Tab): void {
    this.$data.activeTab = tab;
  }
}
</script>

<style scoped>
.tab-content .bordered {
  border:1px solid #DDD;
  border-top:0px;
  padding: 10px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin-right: -10px;
}
</style>
