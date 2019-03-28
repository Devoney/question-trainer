<template>
  <div>
    <div class="row">
      <div class="col-2">
        <label class="font-weight-bold">Ch. Nr.:</label>
          <input
            :class="['form-control', { 'is-invalid': error.nr !== '' }]"
            type="text"
            v-model.trim="chapter.nr"
            v-on:keyup="numberChanged"
            v-on:keydown.esc="cancel"
            :title="error.nr"
          >
      </div>
      <div class="col">
        <label class="font-weight-bold">Title:</label>
        <div class="input-group row no-gutters">
          <input
            :class="['form-control', { 'is-invalid': error.title !== '' }]"
            type="text"
            v-model.trim="chapter.title"
            v-on:keyup="titleChanged"
            v-on:keydown.enter="ok"
            v-on:keydown.esc="cancel"
            :title="error.title"
          >
          <div class="input-group-append">
            <button
              :class="['btn input-group-append', { 'btn-primary': canExecute, 'btn-secondary': !canExecute }]"
              :disabled="!canExecute"
              @click="ok"
            >{{ buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

export default abstract class ChapterBase extends mixins(StoreMixin) {
  protected abstract buttonText: string;

  protected chapter: { nr: string, title: string } = {
    nr: '',
    title: '',
  };

  protected error: { nr: string, title: string } = {
    nr: '',
    title: '',
  };

  protected cancel(): void {
    this.error.nr = '';
    this.error.title = '';
    this.chapter.nr = '';
    this.chapter.title = '';
  }
}
</script>

<style scoped>
</style>