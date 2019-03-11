<template>
  <div id="app">
    <add-book />
    <book-table :books="books" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AddBook from '@/components/AddBook.vue';
import AddOrRemove from '@/components/AddOrRemove.vue';
import BookTable from '@/components/BookTable.vue';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

@Component({
  components: {
    AddBook,
    AddOrRemove,
    BookTable,
  },
})
export default class App extends Vue {
  private data() {
    return {
      books: [] as Book[],
    };
  }

  private created() {
    this.$data.books = [
      new Book('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', 'C# Programming', [
        new Chapter('1', 'My first C# program', [
          new Question('My first question', 'The ultimate answer', 99),
        ]),
        new Chapter('2', 'IL weaving'),
      ]),
      new Book('4f642128-7918-4279-a015-6c668b54f550', 'C++ Programming', []),
      new Book('a527d884-5d83-4719-a3cc-e0ee4e7b13e3', 'Atmel Chip Technology', []),
    ];

    setTimeout(() => {
      const book = this.$data.books[0] as Book;
      book.chapters[0].questions.push(new Question('Q', 'A', 1));
    }, 2000);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
