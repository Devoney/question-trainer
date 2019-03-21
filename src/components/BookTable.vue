<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <th></th>
        <th>Nr</th>
        <th>Title</th>
        <th>Nr of
          <br>chapters
        </th>
        <th>Nr of
          <br>questions
        </th>
        <th></th>
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

import { Store } from 'vuex';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
library.add(faExclamationTriangle);

import { Component, Prop, Vue } from 'vue-property-decorator';
import BookRecord from '@/components/BookRecord.vue';
import Book from '@/models/Book';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

@Component({
  components: {
    BookRecord,
    ConfirmationModal,
  },
})
export default class BookTable extends Vue {
  private data() {
    return {
      modalId: 'confirmation-modal-book-table',
      bookIdUpForDelete: undefined,
    };
  }

  get store(): Store<IState> {
    return this.$store;
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  get hasBooks(): boolean {
    return !_.isEmpty(this.books);
  }

  get booksSorted(): Book[] {
    return _.orderBy(this.books, (b: Book) => {
      return b.title.toLowerCase();
    });
  }

  private trash(bookId: string): void {
    this.$data.bookIdUpForDelete = bookId;
    $('#' + this.$data.modalId).modal();
  }

  private deleteConfirmed() {
    const bookId: string = this.$data.bookIdUpForDelete as string;
    this.store.commit(MutationTypes.removeBookById, bookId);
  }

  private deleteCanceled() {
    this.$data.bookIdUpForDelete = undefined;
  }
}
</script>

<style scoped>
</style>