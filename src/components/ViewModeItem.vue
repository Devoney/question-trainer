<template>
  <a :class="[{ disabled: viewModeIs(viewMode)}, 'dropdown-item']" href="#" :disabled="store.viewMode === viewMode" @click="setViewMode(viewMode)">
    <div class="row">
      <div class="col-3">
          <font-awesome-icon :icon="icon" v-if="icon !== undefined"/>
      </div>
      <div class="col">{{ text }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class ViewModeItem extends mixins(StoreMixin) {
  @Prop({ required: true }) public viewMode!: string;
  @Prop({ required: true }) public text!: string;
  @Prop({ default: undefined }) public icon: string | undefined;

  private viewModeIs(viewMode: string): boolean {
    return this.store.state.viewMode === viewMode;
  }

  private setViewMode(viewMode: string): void {
    this.store.commit(MutationTypes.viewMode, viewMode);
  }
}
</script>

<style scoped>
</style>