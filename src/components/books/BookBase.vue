<template>
  <div class="form-group">
    <div class="row">
      <div class="col text-left">
        <label class="font-weight-bold" for="bookTitleText">Title:</label>
      </div>
    </div>
    <div class="input-group row no-gutters">
      <input
        :class="['form-control', { 'is-invalid': invalidTitle }]"
        id="bookTitleText"
        type="text"
        v-model.trim="bookTitle"
        v-on:keydown.enter="onOk"
        v-on:keydown.esc="cancel"
        :title="errorMessageToShow"
      >
      <div class="input-group-append">
        <button
          :class="['btn input-group-append', { 'btn-primary': !invalidTitle, 'btn-secondary': invalidTitle }]"
          :disabled="invalidTitle"
          id="btn-ok-book"
          @click="onOk"
        >{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';
import { mixins } from 'vue-class-component';

export default abstract class BookBase extends mixins(StoreMixin) {
  protected errorMessage: string = '';
  protected abstract buttonText: string;
  protected bookTitle: string = '';

  get invalidTitle(): boolean {
    return this.isInvalidTitle();
  }

  protected abstract ok(): void;
  protected abstract cancel(): void;
  protected abstract isInvalidTitle(): boolean;

  private onOk(): void {
    if (this.isInvalidTitle()) { return; }
    this.ok();
  }

  get errorMessageToShow(): string {
    if (_.isEmpty(this.bookTitle)) { return ''; }
    return this.errorMessage;
  }
}
</script>