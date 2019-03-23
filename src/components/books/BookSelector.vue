<template>
  <div>
    <label class="font-weight-bold">Book:</label>
    <select class="form-control" v-model="bookSelected" @change="bookSelectedChanged">
      <option v-for="book in books" v-bind:value="book.id" v-bind:key="book.id">{{ book.title }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';

import Book from '@/models/Book';

import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class BookSelector extends Vue {
  private bookSelected: string = '';

  get store(): Store<IState> {
    return this.$store;
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  private bookSelectedChanged(args: any): void {
    const book = _.find(this.books, (b: Book) => {
      return b.id === this.bookSelected;
    });
    this.$emit('book-selected', book);
  }
}
</script>
