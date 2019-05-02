<template>
  <div>
    <main>
      <div id="app" class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-xl-6 grow box-left">
            <library/>
          </div>
          <div class="col-lg-12 col-xl-6 box-right">
            <question-trainer/>
            <question-list class="question-list"/>
          </div>
        </div>
      </div>
      <question-modal/>
    </main>
    <footer class="footer">
      <div class="container">
        <div>
          <a href="https://github.com/Devoney/question-trainer">Question Trainer v1.0</a> by <a href="mailto:mikedeklerk@gmail.com">Mike de Klerk</a> &copy; 2019
        </div>
        <div class="favicon-credits">
          Icons made by
          <a
            href="https://www.flaticon.com/authors/popcorns-arts"
            title="Icon Pond"
          >Icon Pond</a> from
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >CC 3.0 BY</a>
        </div>
      </div>
    </footer>
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
import QuestionTrainer from '@/components/questionList/QuestionTrainer.vue';
Vue.use(CKEditor);

@Component({
  components: {
    Library,
    QuestionList,
    QuestionModal,
    QuestionTrainer,
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
  margin-top: 30px;
}

.box-left {
  min-width: 588px;
}

.box-right {
  margin-top: 49px;
  min-width: 596px;
}

.container {
  width: 100%;
  min-width: 96%;
}

.favicon-credits {
  display: none;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #cccccc;
  color: white;
  text-align: center;
}

.question-list {
  margin-top: 15px;
}
</style>
