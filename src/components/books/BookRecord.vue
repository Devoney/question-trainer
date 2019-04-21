<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      <add-or-remove
        remove-color="red"
        @add="addQuestionsToList"
        @remove="removeQuestionsFromList"
      />
    </td>
    <td class="text-right" style="width: 70px;">
      <span aria-label="Index">{{ index }}</span>
    </td>
    <td class="text-left">
      <span style="cursor: pointer;" aria-label="Title of book">{{ book.title }}</span>
    </td>
    <td class="text-center">
      <div>
        <span aria-label="Number of chapters">{{ nrOfChapters }}</span>
      </div>
    </td>
    <td class="text-center">
      <span aria-label="Number of questions">{{ nrOfQuestions }}</span>
    </td>
    <td class="text-center table-col-delete">
      <icon-button
        icon="edit"
        label="Edit book"
        :argument="book"
        @click="edit"
        :disabled="bookInEditMode"
      />
      <icon-button
        icon="trash-alt"
        label="Trash book"
        :argument="book"
        @click="trash"
        :disabled="bookInEditMode"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import bus from '@/MessageBus';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';
import AddOrRemove from '@/components/AddOrRemove.vue';
import IconButton from '@/components/IconButton.vue';
import Book from '@/models/Book';
import Question from '@/models/Question';
import QuestionModalArgs from '@/types/QuestionModalArgs';

@Component({
  components: {
    AddOrRemove,
    IconButton,
  },
})
export default class BookRecord extends mixins(StoreMixin) {
  @Prop() public book!: Book;
  @Prop() public index!: number;

  get nrOfQuestions() {
    if (this.nrOfChapters === 0) { return 0; }
    return Book.questions(this.book).length;
  }

  get bookInEditMode(): boolean {
    if (this.store.state.bookEdited === undefined) { return false; }
    return this.store.state.bookEdited.id === this.book.id;
  }

  get nrOfChapters() {
    if (this.book.chapters === undefined) { return 0; }
    return this.book.chapters.length;
  }

  private addQuestionsToList(): void {
    _.forEach(Book.questions(this.book), (q) => {
      this.store.commit(MutationTypes.QuestionList.addToList, q);
    });
  }

  private removeQuestionsFromList(): void {
    _.forEach(Book.questions(this.book), (q) => {
      this.store.commit(MutationTypes.QuestionList.removeFromList, q);
    });
  }

  private raiseEvent(eventName: string) {
    this.$emit(eventName, this.book.id);
  }

  private edit(book: Book): void {
    this.store.commit(MutationTypes.Book.setEditedBook, book);
  }

  private trash(book: Book): void {
    const args = new QuestionModalArgs(
      'Delete book',
      'Are you sure you want to delete this book?',
      this.trashConfirmed,
      'Yes',
      'No',
    );
    bus.showQuestionModal(args);
  }

  private trashConfirmed() {
    this.removeQuestionsFromList();
    this.store.commit(MutationTypes.Book.removeBookById, this.book.id);
  }
}
</script>
