<template>
  <div>
    <label class="font-weight-bold">Book:</label>
    <select class="form-control" v-model="bookSelected">
      <option v-for="book in books" v-bind:value="book" v-bind:key="book.id">{{ book.title }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import Book from '@/models/Book';

import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class BookSelector extends Vue {
  get store(): Store<IState> {
    return this.$store;
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  get bookSelected(): Book | undefined {
    return this.store.state.bookSelected;
  }
  set bookSelected(book: Book | undefined) {
    this.store.commit(MutationTypes.setSelectedBook, book);
  }
}
</script>
