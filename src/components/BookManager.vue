<template>
  <div>
    <div class="row">
      <div class="col has-error">
        <add-book @title-changed="titleChanged" :error-message="titleIsNotValidMessage" @add="add"/>
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

import Book from '@/models/Book';

import AddBook from '@/components/AddBook.vue';
import BookTable from '@/components/BookTable.vue';

@Component({
  components: {
    AddBook,
    BookTable,
  },
})
export default class BookManager extends Vue {
  @Prop({ required: true }) private books!: Book[];

  private data(): any {
    return {
      titleIsNotValidMessage: undefined,
    };
  }

  private add(title: string): void {
    if (this.titleAlreadyInCollection(title)) { return; }

    const books = this.books;
    const id = uuid();
    books.push(new Book(id, title));
  }

  private titleChanged(title: { new: string, old: string }): void {
    if (title.new === undefined) {
      this.$data.titleIsNotValidMessage = undefined;
      return;
    }

    const titleLowerCase = title.new.toLowerCase();
    const titleExists = _.findIndex(this.books, (b) => {
      return b.title.toLowerCase() === titleLowerCase;
    }) !== -1;

    this.$data.titleIsNotValidMessage = titleExists ? 'Title already exists.' : undefined;
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