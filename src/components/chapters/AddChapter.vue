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
import { mixins } from 'vue-class-component';
import { Store } from 'vuex';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';

@Component
export default class AddChapter extends mixins(StoreMixin) {
  private chapter: { nr: string, title: string } = {
    nr: '',
    title: '',
  };

  private error: { nr: string, title: string } = {
    nr: '',
    title: '',
  };

  get chapters(): Chapter[] {
    if (this.store.state.bookSelected === undefined) { return []; }
    return this.store.state.bookSelected.chapters;
  }

  get canAdd() {
    return !this.hasError
      && !_.isEmpty(this.chapter.nr)
      && !_.isEmpty(this.chapter.title)
      && !this.chapterNumberExists()
      && !this.titleExists();
  }

  get hasError() {
    return !_.isEmpty(this.error.title) || !_.isEmpty(this.error.nr);
  }

  private add(): void {
    if (!this.canAdd) { return; }

    const id = uuid();
    const chapter = new Chapter(id, this.chapter.nr.toString(), this.chapter.title);

    this.store.commit(MutationTypes.addChapter, chapter);

    this.chapter.title = '';
    this.chapter.nr = '';
  }

  private chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase();
    }) !== -1;
  }

  private numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.error.nr = 'Chapter already exists for this book.';
      return;
    }

    this.error.nr = '';
  }

  private titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.chapter.title.toLowerCase();
    }) !== -1;
  }

  private titleChanged(): void {
    if (this.titleExists()) {
      this.error.title = 'Title already exists for this book.';
      return;
    }

    this.error.title = '';
  }
}
</script>
