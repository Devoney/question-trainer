<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <font-awesome-icon icon="eye" /><span class="view-mode-text">View mode</span>
    </button>
    <div class="dropdown-menu">
      <view-mode-item icon="columns" text="Both" view-mode="both"/>
      <view-mode-item icon="book" text="Library only" view-mode="library"/>
      <view-mode-item icon="question-circle" text="Questions only" view-mode="questions"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import ViewModeItem from '@/components/ViewModeItem.vue';
@Component({
  components: {
    ViewModeItem,
  },
})
export default class ViewMode extends mixins(StoreMixin) {
}
</script>

<style scoped>
.view-mode-text {
  margin-left: 10px;
}
</style>