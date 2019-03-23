<template>
  <div>
    <div class="row">
      <div class="col-2">
        <label class="font-weight-bold">Ch. Nr.:</label>
          <input
            :class="['form-control', { 'is-invalid': error.nr !== undefined }]"
            type="text"
            v-model.trim="chapter.nr"
            v-on:keyup="numberChanged"
            :title="error.nr"
          >
      </div>
      <div class="col">
        <label class="font-weight-bold">Title:</label>
        <div class="input-group row no-gutters">
          <input
            :class="['form-control', { 'is-invalid': error.title !== undefined }]"
            type="text"
            v-model.trim="chapter.title"
            v-on:keyup="titleChanged"
            v-on:keydown.enter="add"
            :title="error.title"
          >
          <div class="input-group-append">
            <button
              :class="['btn input-group-append', { 'btn-primary': canAdd, 'btn-secondary': !canAdd }]"
              :disabled="!canAdd"
              @click="add"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import uuid from 'uuid/v1';
import Chapter from '@/models/Chapter';

import { Store } from 'vuex';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class AddChapter extends Vue {
  private data(): any {
    return {
      chapter: {
        nr: '',
        title: '',
      },
      error: {
        nr: undefined,
        title: undefined,
      },
    };
  }

  get store(): Store<IState> {
    return this.$store;
  }

  get chapters(): Chapter[] {
    if (this.store.state.bookSelected === undefined) { return []; }
    return this.store.state.bookSelected.chapters;
  }

  get canAdd() {
    return !this.hasError
      && !_.isEmpty(this.$data.chapter.nr)
      && !_.isEmpty(this.$data.chapter.title)
      && !this.chapterNumberExists()
      && !this.titleExists();
  }

  get hasError() {
    return !_.isEmpty(this.$data.error.title) || !_.isEmpty(this.$data.error.nr);
  }

  private add(): void {
    if (!this.canAdd) { return; }

    const id = uuid();
    const chapter = new Chapter(id, this.$data.chapter.nr.toString(), this.$data.chapter.title);

    this.store.commit(MutationTypes.addChapter, chapter);

    this.$data.chapter.title = '';
    this.$data.chapter.nr = '';
  }

  private chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.$data.chapter.nr.toLowerCase();
    }) !== -1;
  }

  private numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.$data.error.nr = 'Chapter already exists for this book.';
      return;
    }

    this.$data.error.nr = undefined;
  }

  private titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.$data.chapter.title.toLowerCase();
    }) !== -1;
  }

  private titleChanged(): void {
    if (this.titleExists()) {
      this.$data.error.title = 'Title already exists for this book.';
      return;
    }

    this.$data.error.title = undefined;
  }
}
</script>

<style scoped>
</style>