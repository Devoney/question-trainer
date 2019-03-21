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
        
      </tab-page>
      <tab-page title="Questions">

      </tab-page>
    </tabs>
  </div>
</template>

<script lang="ts">
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import { Store } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

import AddOrRemove from '@/components/AddOrRemove.vue';
import BookManager from '@/components/BookManager.vue';

import Tabs from '@/components/Tabs.vue';
import TabPage from '@/components/TabPage.vue';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

import Tab from '@/types/Tab';

Vue.component('add-or-remove', AddOrRemove);
Vue.component('book-manager', BookManager);

@Component({
  components: {
    Tabs,
    TabPage,
  },
})
export default class App extends Vue {
  private data() {
    return {
      tabs: [] as Tab[],
    };
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  get store(): Store<IState> {
    return this.$store;
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
