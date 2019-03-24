<template>
  <div>
    <div class="row">
      <div class="col has-error">
        <add-book
          ref="addBook"
          @title-changed="titleChanged"
          :error-message="titleIsNotValidMessage"
          @add="add"
        />
      </div>
    </div>
    <div class="row book-table">
      <div class="col">
        <book-table :books="books"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import $ from 'jquery';
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'bootstrap';
import uuid from 'uuid/v1';
import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';

import Book from '@/models/Book';

import AddBook from '@/components/books/AddBook.vue';
import BookTable from '@/components/books/BookTable.vue';

@Component({
  components: {
    AddBook,
    BookTable,
  },
})
export default class BookManager extends Vue {
  private titleIsNotValidMessage: string = '';

  get store(): Store<IState> {
    return this.$store;
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  private add(title: string): void {
    if (_.isEmpty(_.trim(title))) { return; }
    if (this.titleAlreadyInCollection(title)) { return; }

    const books = this.books;
    const id = uuid();
    const book = new Book(id, title);
    this.store.commit(MutationTypes.addBook, book);
  }

  private titleChanged(title: { new: string, old: string }): void {
    if (title.new === undefined || title.new === '') {
      this.titleIsNotValidMessage = '';
      return;
    }

    const titleLowerCase = title.new.toLowerCase();
    const titleExists = _.findIndex(this.books, (b) => {
      return b.title.toLowerCase() === titleLowerCase;
    }) !== -1;

    this.titleIsNotValidMessage = titleExists ? 'Title already exists.' : '';
  }

  private titleAlreadyInCollection(title: string): boolean {
    const lowerCaseTitle = title.toLowerCase();
    return _.findIndex(this.books, (b: Book) => {
      return b.title.toLowerCase() === lowerCaseTitle;
    }) !== -1;
  }
}
</script>

<style scoped>
.book-table {
  margin-top: 20px;
}
</style>