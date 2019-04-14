<template>
  <tabs>
    <tab-page title="Library"></tab-page>
    <tab-page title="Books" :is-default="true">
      <book-manager/>
    </tab-page>
    <tab-page title="Chapters">
      <chapter-manager/>
    </tab-page>
    <tab-page title="Questions">
      <question-manager/>
    </tab-page>
  </tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Book from '@/models/Book';
import BookManager from '@/components/books/BookManager.vue';
import Chapter from '@/models/Chapter';
import ChapterManager from '@/components/chapters/ChapterManager.vue';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionManager from '@/components/questions/QuestionManager.vue';
import StoreMixin from '@/mixins/StoreMixin';
import Tab from '@/types/Tab';
import Tabs from '@/components/Tabs.vue';
import TabPage from '@/components/TabPage.vue';

@Component({
  components: {
    BookManager,
    ChapterManager,
    QuestionManager,
    Tabs,
    TabPage,
  },
})
export default class Library extends mixins(StoreMixin) {
  private data() {
    return {
      tabs: [] as Tab[],
    };
  }

  get books(): Book[] {
    return this.store.state.books;
  }

  private created() {
    const books: Book[] = [
      new Book('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', 'Consciousness', [
        new Chapter('62f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3d3c', '1', 'Deep meditation is easy', [
          new Question('1', 'What is a question?', 'An evaluation', '99'),
        ]),
        new Chapter('72f0f2cc-3f9b-4da1-ae2e-b4ba7a1b3e3c', '2', 'Lucid dreaming'),
      ]),
      new Book('4f642128-7918-4279-a015-6c668b54f550', 'Love', [
        new Chapter('4f642128-7918-4279-a025-9c668b54f550', '1', 'Long lasting relationships', [
          new Question('2', 'How to build a long lasting relationship', 'Based on trust and respect', '1'),
        ]),
      ]),
      new Book('a527d884-5d83-4719-a3cc-e0ee4e7b13e3', 'Designing your own reality', [
        new Chapter('4f642128-7918-4279-a025-9c668b54f550', '1', 'Mind fitness', [
          new Question('3', 'How to get the mind fit?', 'Rest and practice a lot', '1'),
        ]),
      ]),
    ];
    this.store.commit(MutationTypes.Book.setBooks, books);
  }
}
</script>

<style scoped>
</style>