<template>
  <div class="form-group">
    <div class="row">
      <div class="col text-left">
        <label class="font-weight-bold" for="bookTitleText">Library name:</label>
      </div>
    </div>
    <div class="input-group row no-gutters">
      <input
        class="form-control"
        id="libraryTitle"
        type="text"
        v-model.trim="libraryName"
        v-on:keydown.enter="ok"
        v-on:keydown.esc="cancel"
      >
      <div class="input-group-append">
        <button
          class="btn input-group-append btn-primary"
          @click="ok"
        >Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class LibraryDetails extends mixins(StoreMixin) {
  private libraryName: string = '';

  private ok(): void {
    this.store.commit(MutationTypes.Library.setName, this.libraryName);
  }

  private cancel(): void {
    this.libraryName = this.store.state.libraryName
  }

  private mounted(): void {
    console.log("LibraryDetails: mounted");
    this.libraryName = this.store.state.libraryName;
  } 
}
</script>

<style scoped>
</style>