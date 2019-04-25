<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Book from '@/models/Book';
import MutationTypes from '@/state/MutationTypes';
import BookBase from '@/components/books/BookBase.vue';

@Component
export default class EditBook extends BookBase {
  protected buttonText: string = 'Save';
  private originalBookTitle: string = '';

  protected get invalidTitle(): boolean {
    if (_.isEmpty(this.bookTitle)) { return true; }
    return _.findIndex(this.store.state.books, (book: Book) => {
      // @ts-ignore
      if (book.id === this.store.state.bookEdited.id) { return false; }
      return book.title.toLowerCase() === this.bookTitle.toLowerCase();
    }) !== -1;
  }

  get canSave() {
    return !this.invalidTitle && !_.isEmpty(this.bookTitle.trim());
  }

  protected cancel(): void {
    this.store.commit(MutationTypes.Book.setEditedBook, undefined);
  }

  protected ok(): void {
    if (!this.canSave) { return; }
    if (this.store.state.bookEdited === undefined) {
      throw new Error('No book is being edited, but the edit is being saved.');
    }
    this.store.commit(MutationTypes.Book.editBook, this.bookTitle);
    this.cancel();
  }

  @Watch('bookTitle')
  private onBookTitleChanged(newTitle: string, oldTitle: string) {
    if (this.invalidTitle) {
      this.errorMessage = 'Title already exists.';
    } else {
      this.errorMessage = '';
    }
  }

  @Watch('store.state.bookEdited')
  private bookEditedChanged() {
    if (this.store.state.bookEdited === undefined) { return; }
    this.handleEdit();
    this.setFocus();
  }

  private mounted(): void {
    this.handleEdit();
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
    const inputElement = this.$refs.bookTitleText as HTMLInputElement;
    this.$nextTick(() => {
      inputElement.focus();
    });
  }
}
</script>