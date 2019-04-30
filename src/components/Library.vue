<template>
  <tabs>
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
        <h3>What is this application for?</h3>
        <p>The idea of this application is to help you study. You turn something that you study into questions. With that, you also provide the answers.
          You then put the questions you want to study in a list and start training.
        <br>By repeating the questions you are training your knowledge.
        The moment you answered all questions correctly you could say you have no questions anymore about the material you are studying.
        You could then say that you mastered it.
        </p>
        <h3>This application is under development.</h3>
        Future features that will follow:<br>
        <ul>
          <span class="checkmark">✔</span> Keep repeating questions you answered incorrectly.<br>
          ☐ Different views. To focus on the library of questions you are building, training, or both. The current view is both.<br>
          ☐ Translations. The first language will be Dutch.<br>
        </ul>
      </div>
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
.checkmark {
  color: green;
}
</style>