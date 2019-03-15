<template>
  <div id="app" class="container">
    <tabs :tabs="tabs" :props="{ books }"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AddOrRemove from '@/components/AddOrRemove.vue';
import BookManager from '@/components/BookManager.vue';
import Tabs from '@/components/Tabs.vue';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

import Tab from '@/types/Tab';

Vue.component('add-or-remove', AddOrRemove);
Vue.component('book-manager', BookManager);

@Component({
  components: {
    Tabs,
  },
})
export default class App extends Vue {
  private data() {
    return {
      books: [] as Book[],
      tabs: [] as Tab[],
    };
  }

  private created() {
    const books: Book[] = [
      new Book('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', 'C# Programming', [
        new Chapter('1', 'My first C# program', [
          new Question('My first question', 'The ultimate answer', 99),
        ]),
        new Chapter('2', 'IL weaving'),
      ]),
      new Book('4f642128-7918-4279-a015-6c668b54f550', 'C++ Programming', []),
      new Book('a527d884-5d83-4719-a3cc-e0ee4e7b13e3', 'Atmel Chip Technology', []),
    ];
    this.$data.books = books;

    this.$data.tabs.push(new Tab('Books', 'book-manager', { books }));
    this.$data.tabs.push(new Tab('AddOrRemove', 'add-or-remove', { addColor: 'red'}));

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
