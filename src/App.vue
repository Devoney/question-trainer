<template>
  <div>
    <div id="app" class="container">
      <div class="row">
        <div class="col-6 box-left">
          <library/>
        </div>
        <div class="col-6 box-right">
          <question-tester />
          <question-list class="question-list"/>
        </div>
      </div>
    </div>
    <question-modal />
  </div>
</template>

<script lang="ts">
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import { mixins } from 'vue-class-component';
import { Component, Vue } from 'vue-property-decorator';
import Library from '@/components/Library.vue';
import '@/font-awesome';
import QuestionList from '@/components/questionList/QuestionList.vue';
import StoreMixin from '@/mixins/StoreMixin';
import QuestionModal from '@/components/QuestionModal.vue';
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
import bus from '@/MessageBus';
import QuestionModalArgs from './types/QuestionModalArgs';
import QuestionTester from '@/components/questionList/QuestionTester.vue';
Vue.use(CKEditor);

@Component({
  components: {
    Library,
    QuestionList,
    QuestionModal,
    QuestionTester,
  },
})
export default class App extends mixins(StoreMixin) {
  private created(): void {
    this.store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state));
    });

    this.store.commit(MutationTypes.initialise);
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

.box-right {
  margin-top: 42px;
}

.container {
  width: 100%;
  min-width: 96%;
}

.question-list {
  margin-top:15px;
}
</style>
