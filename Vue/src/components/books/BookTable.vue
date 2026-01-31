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
        />
      </tbody>
      <tfoot v-if="!hasBooks">
        <th colspan="6">No books</th>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import StoreMixin from '@/mixins/StoreMixin';

// import { Store } from 'vuex';
// import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';

import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import BookRecord from '@/components/books/BookRecord.vue';
import Book from '@/models/Book';

@Component({
  components: {
    BookRecord,
  },
})
export default class BookTable extends mixins(StoreMixin) {
  get books(): Book[] {
    return this.store.state.books;
  }

  get hasBooks(): boolean {
    return !_.isEmpty(this.books);
  }

  get booksSorted(): Book[] {
    return this.store.getters.booksSortedByTitle;
  }
}
</script>

<style scoped>
</style>