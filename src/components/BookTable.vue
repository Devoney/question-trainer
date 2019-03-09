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
          v-for="(book, index) in books"
          v-bind:key="book.id"
          :book="book"
          :index="index+1"
          @trash="trash"
        />
      </tbody>
    </table>
    <confirmation-modal
      :id="modalId"
      @ok="deleteConfirmed"
      @cancel="deleteCanceled"
      okText="Yes"
      cancelText="No"
    >Are you sure you want to delete this book?</confirmation-modal>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import $ from 'jquery';

import { Component, Prop, Vue } from 'vue-property-decorator';
import BookRecord from '@/components/BookRecord.vue';
import Book from '@/models/Book';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

@Component({
  components: {
    BookRecord,
    ConfirmationModal
  },
})
export default class BookTable extends Vue {
  @Prop() private books!: Book[];

  data() {
    return {
      modalId: 'confirmation-modal-81fa223c',
      bookIdUpForDelete: undefined,
    };
  }

  trash(bookId: string): void {    
    this.$data.bookIdUpForDelete = bookId;
    $('#' + this.$data.modalId).modal();
  }

  deleteConfirmed() {
    let bookId: string = this.$data.bookIdUpForDelete as string;

    _.forEach(this.books, (book, index) => {
      if(book.id === bookId) {
        this.books.splice(index, 1);
        return false;
      }
    });
  }

  deleteCanceled() {
    this.$data.bookIdUpForDelete = undefined;
  }
}
</script>

<style scoped>
</style>