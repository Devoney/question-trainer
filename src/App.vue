<template>
  <div id="app" class="container">
    <!-- <tabs :tabs="tabs"/> -->
    <tabs>
      <tab-page title="Library">

      </tab-page>
      <tab-page title="Books" :is-default="true">
        <book-manager />
      </tab-page>
      <tab-page title="Chapters">
        <chapter-manager />
      </tab-page>
      <tab-page title="Questions">

      </tab-page>
    </tabs>
  </div>
</template>

<script lang="ts">
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import { mixins } from 'vue-class-component';
import { Component, Vue } from 'vue-property-decorator';

import AddOrRemove from '@/components/AddOrRemove.vue';
import BookManager from '@/components/books/BookManager.vue';
import ChapterManager from '@/components/chapters/ChapterManager.vue';

import Tabs from '@/components/Tabs.vue';
import TabPage from '@/components/TabPage.vue';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

import Tab from '@/types/Tab';

import '@/font-awesome';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    BookManager,
    ChapterManager,
    Tabs,
    TabPage,
  },
})
export default class App extends mixins(StoreMixin) {
  private data() {
    return {
      tabs: [] as Tab[],
    };
  }

  get books(): Book[] {
    return this.store.book.books;
  }

  private created() {
    const books: Book[] = [
      new Book('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', 'C# Programming', [
        new Chapter('62f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', '1', 'My first C# program', [
          new Question('My first question', 'The ultimate answer', 99),
        ]),
        new Chapter('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3e3c', '2', 'IL weaving'),
      ]),
      new Book('4f642128-7918-4279-a015-6c668b54f550', 'C++ Programming', []),
      new Book('a527d884-5d83-4719-a3cc-e0ee4e7b13e3', 'Atmel Chip Technology', []),
    ];
    this.store.commit(MutationTypes.setBooks, books);
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
