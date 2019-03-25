<template>
  <div class="form-group">
    <div class="row">
      <div class="col text-left">
        <label class="font-weight-bold" for="bookTitleText">Title:</label>
      </div>
    </div>
    <div class="input-group row no-gutters">
      <input
        :class="['form-control', { 'is-invalid': titleAlreadyExists }]"
        id="bookTitleText"
        type="text"
        v-model.trim="bookTitle"
        v-on:keydown.enter="save"
        v-on:keydown.esc="cancel"
      >
      <div class="input-group-append">
        <button
          :class="['btn input-group-append', { 'btn-primary': canSave, 'btn-secondary': !canSave }]"
          :disabled="!canSave"
          id="btn-save-book"
          @click="save"
        >Save</button>
        <button
          class="btn input-group-append btn-danger"
          id="btn-cancel-edit-book"
          @click="cancel"
          title="Cancel edit"
        >X</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Book from '@/models/Book';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';

@Component
export default class AddBook extends mixins(StoreMixin) {
  private bookTitle: string = '';
  private originalBookTitle: string = '';

  get titleAlreadyExists(): boolean {
    return _.findIndex(this.store.state.books, (book: Book) => {
      // @ts-ignore
      if (book.id === this.store.state.bookEdited.id) { return false; }
      return book.title.toLowerCase() === this.bookTitle.toLowerCase();
    }) !== -1;
  }

  get canSave() {
    return !this.titleAlreadyExists && !_.isEmpty(this.bookTitle.trim());
  }

  @Watch('store.state.bookEdited')
  private bookEditedChanged() {
    this.handleEdit();
    this.setFocus();
  }

  private created(): void {
    this.handleEdit();
  }

  private mounted(): void {
    this.setFocus();
  }

  private handleEdit(): void {
    if (this.store.state.bookEdited === undefined) {
      throw new Error('No book is being edited, but the edit component is shown.');
    }
    this.bookTitle = this.store.state.bookEdited.title;
    this.originalBookTitle = this.bookTitle;
  }

  private setFocus(): void {
    const inputElement = document.getElementById('bookTitleText') as HTMLInputElement;
    inputElement.focus();
  }

  private cancel(): void {
    this.store.commit(MutationTypes.setEditedBook, undefined);
  }

  private save(): void {
    if (!this.canSave) { return; }
    if (this.store.state.bookEdited === undefined) {
      throw new Error('No book is being edited, but the edit is being saved.');
    }
    this.store.state.bookEdited.title = this.bookTitle;
    this.cancel();
  }
}
</script>