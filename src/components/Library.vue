<template>
  <tabs>
    <tab-page title="Library">
      <library-details />
    </tab-page>
    <tab-page title="Books" :is-default="true">
      <book-manager/>
    </tab-page>
    <tab-page title="Chapters">
      <chapter-manager/>
    </tab-page>
    <tab-page title="Questions">
      <question-manager/>
    </tab-page>
    <tab-page title="Help">
      <div class="text-left">
        <h4>What is this app?</h4>
        <p>
          An effective way to learn new things is by starting with a question, find the answer, and repeat that.
          So when you are studying from books for instance, you can turn everything you didn't know into questions.
          You then find the answer for it. When you repeat the questions till you know them, you are effectively studying.
          This app helps you doint that.
        </p>
        <h4>How to use it?</h4>
        <p>  
          <ul>
          <li>Start by adding books.</li>
          <li>For each book you then add chapters.</li>
          <li>For each chapter you then add questions.</li>
          <li>Put questions you want to study in the list.</li>
          <li>Press start to train the questions.</li>
          </ul>
        </p>
        <h4>How do I know I am ready for the exam?</h4>
        <p>
          <ul>
            <li>When you have been honest with yourself, and you have created a question for every little thing you did not know yet.</li>
            <li>You have repeated the list of questions several times while answering all questions correctly.</li>
          </ul>
        </p>
      </div>
    </tab-page>
  </tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import AddOrRemove from '@/components/AddOrRemove.vue';
import Book from '@/models/Book';
import BookManager from '@/components/books/BookManager.vue';
import Chapter from '@/models/Chapter';
import ChapterManager from '@/components/chapters/ChapterManager.vue';
import IState from '@/state/IState';
import LibraryDetails from '@/components/library/LibraryDetails.vue';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionManager from '@/components/questions/QuestionManager.vue';
import StoreMixin from '@/mixins/StoreMixin';
import Tab from '@/types/Tab';
import Tabs from '@/components/Tabs.vue';
import TabPage from '@/components/TabPage.vue';

@Component({
  components: {
    AddOrRemove,
    BookManager,
    ChapterManager,
    LibraryDetails,
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
.checkmark {
  color: green;
}
</style>