<template>
  <div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        View mode
      </button>
      <div class="dropdown-menu">
        <view-mode-item icon="columns" text="Both" view-mode="both"/>
        <view-mode-item icon="book" text="Library only" view-mode="library"/>
        <view-mode-item icon="question-circle" text="Questions only" view-mode="questions"/>
      </div>
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
</style>