<template>
  <div>
    <div class="row">
      <div class="col-2">
        <label class="font-weight-bold">Ch. Nr.:</label>
          <input
            :class="['form-control', { 'is-invalid': error.nr !== '' }]"
            type="text"
            v-model.trim="chapter.nr"
            v-on:keydown.esc="cancel"
            :title="error.nr"
            aria-label="Nr of chapter"
          >
      </div>
      <div class="col">
        <label class="font-weight-bold">Title:</label>
        <div class="input-group row no-gutters">
          <input
            :class="['form-control', { 'is-invalid': error.title !== '' }]"
            type="text"
            v-model.trim="chapter.title"
            v-on:keydown.enter="ok"
            v-on:keydown.esc="cancel"
            :title="error.title"
            aria-label="Title of chapter"
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
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import Chapter from '@/models/chapter';

@Component
export default class ChapterBase extends mixins(StoreMixin) {
  protected buttonText: string = 'Ok';

  protected chapter: { id: string, nr: string, title: string } = {
    id: '',
    nr: '',
    title: '',
  };

  protected error: { nr: string, title: string } = {
    nr: '',
    title: '',
  };

  protected get chapters(): Chapter[] {
    if (this.store.state.bookSelected === undefined) { return []; }
    return this.store.state.bookSelected.chapters;
  }

  protected get canExecute() {
    return !this.hasError
      && !_.isEmpty(this.chapter.nr)
      && !_.isEmpty(this.chapter.title)
      && !this.chapterNumberExists()
      && !this.titleExists();
  }

  protected get hasError() {
    return !_.isEmpty(this.error.title) || !_.isEmpty(this.error.nr);
  }

  protected chapterNumberExists(): boolean {
    throw new Error('Not implemented');
  }

  protected titleExists(): boolean {
    throw new Error('Not implemented');
  }

  protected resetError(): void {
    this.chapter.nr = '';
    this.chapter.title = '';
  }

  protected resetChapter(): void {
    this.error.nr = '';
    this.error.title = '';
  }

  protected resetData(): void {
    this.resetChapter();
    this.resetError();
  }

  @Watch('chapter.nr')
  private numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.error.nr = 'Chapter number already exists for this book.';
      return;
    }

    this.error.nr = '';
  }

  @Watch('chapter.title')
  private titleChanged(): void {
    if (this.titleExists()) {
      this.error.title = 'Title already exists for this book.';
      return;
    }

    this.error.title = '';
  }

  @Watch('chapters')
  private chaptersChanged(): void {
    this.numberChanged();
    this.titleChanged();
  }
}
</script>
