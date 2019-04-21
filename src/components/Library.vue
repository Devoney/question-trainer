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
}
</script>

<style scoped>
</style>