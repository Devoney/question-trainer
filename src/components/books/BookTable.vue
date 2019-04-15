<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <th></th>
        <th>Nr.</th>
        <th class="text-left">Title</th>
        <th>Nr of
          <br>chapters
        </th>
        <th>Nr of
          <br>questions
        </th>
        <th width="90"></th>
      </thead>
      <tbody>
        <book-record
          v-for="(book, index) in booksSorted"
          v-bind:key="book.id"
          :book="book"
          :index="index+1"
          @trash="trash"
        />
      </tbody>
      <tfoot v-if="!hasBooks">
        <th colspan="6">No books</th>
      </tfoot>
    </table>
    <confirmation-modal
      :id="modalId"
      @ok="deleteConfirmed"
      @cancel="deleteCanceled"
      okText="Yes"
      cancelText="No"
    >
      <div class="row">
        <div class="col-3 text-center">
          <font-awesome-icon icon="exclamation-triangle" style="color:orange; font-size:30px;"/>
        </div>
        <div class="col text-left">Are you sure you want to delete this book?</div>
      </div>
    </confirmation-modal>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import $ from 'jquery';
import 'bootstrap';
import StoreMixin from '@/mixins/StoreMixin';

// import { Store } from 'vuex';
// import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';

import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import BookRecord from '@/components/books/BookRecord.vue';
import Book from '@/models/Book';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

@Component({
  components: {
    BookRecord,
    ConfirmationModal,
  },
})
export default class BookTable extends mixins(StoreMixin) {
  private bookIdUpForDelete: string = '';
  private modalId: string = 'confirmation-modal-book-table';

  get books(): Book[] {
    return this.store.state.books;
  }

  get hasBooks(): boolean {
    return !_.isEmpty(this.books);
  }

  get booksSorted(): Book[] {
    return this.store.getters.booksSortedByTitle;
  }

  private trash(bookId: string): void {
    this.bookIdUpForDelete = bookId;
    $('#' + this.modalId).modal();
  }

  private deleteConfirmed() {
    const bookId: string = this.bookIdUpForDelete as string;

    this.removeAllQuestionsFromQuestionList(bookId);

    this.store.commit(MutationTypes.Book.removeBookById, bookId);
  }

  private removeAllQuestionsFromQuestionList(bookId: string): void {
    const book = _.find(this.store.state.books, (b) => {
      return b.id === bookId;
    });
    if (book !== undefined) {
      const questionsArray = _.map(book.chapters, (chapter) => {
        return chapter.questions;
      });
      const questions = _.flatten(questionsArray);
      _.forEach(questions, (q) => {
        this.store.commit(MutationTypes.QuestionList.removeFromList, q);
      });
    }
  }

  private deleteCanceled() {
    this.bookIdUpForDelete = '';
  }
}
</script>

<style scoped>
</style>