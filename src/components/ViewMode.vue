<template>
  <div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        View mode
      </button>
      <div class="dropdown-menu">
        <a :class="[{ disabled: viewModeIs('both')}, 'dropdown-item']" href="#" :disabled="store.viewMode === 'both'" @click="setViewMode('both')">
          <div class="row">
            <div class="col-3">
              <font-awesome-icon icon="columns" />
            </div>
            <div class="col">Both</div>
          </div>
        </a>
        <a :class="[{ disabled: viewModeIs('library')}, 'dropdown-item']" href="#" :disabled="store.viewMode === 'library'" @click="setViewMode('library')">
          <div class="row">
            <div class="col-3">
              <font-awesome-icon icon="book" />
            </div>
            <div class="col">Library only</div>
          </div>
        </a>
        <a :class="[{ disabled: viewModeIs('questions')}, 'dropdown-item']" href="#" @click="setViewMode('questions')">
          <div class="row">
            <div class="col-3">
              <font-awesome-icon icon="question-circle" />
            </div>
            <div class="col">Questions only</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component({
  components: {
  },
})
export default class ViewMode extends mixins(StoreMixin) {
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