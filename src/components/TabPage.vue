<template>
  <div :class="['tab-pane', { 'active': active, 'show': active }]" :id="id" role="tabpanel">
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="tab-content bordered">
          <slot>This tab page has no content yet.
            <br>Use the 'slot' of the tab-page component to add content.
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import uuid from 'uuid/v1';

@Component
export default class TabPage extends Vue {
  @Prop({ required: true }) private title!: string;
  @Prop({ default: false }) private active!: boolean;

  get id() {
    return this.title.split(' ').join('');
  }
}
</script>

<style scoped>
.tab-content .bordered {
  border: 1px solid #ddd;
  border-top: 0px;
  padding: 10px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin-right: -10px;
}
</style>
