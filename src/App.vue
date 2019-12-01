<template>
  <div>
    <main>
      <div id="app" class="container-fluid">
        <firebase-authenticate />
        <div class="row">
          <div class="col text-left">
            <div class="row">
              <div class="flex-container">
                <import-export  />
                <view-mode class="view-mode"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div :class="[{ 'col-xl-6': showBoth }, { 'col-xl-12': !showBoth && showLibrary }, 'col-lg-12', 'grow box-left']" v-if="showLibrary">
            <library/>
          </div>
          <div :class="[{ 'col-xl-6': showBoth }, { 'col-xl-12': !showBoth && showQuestions }, 'col-lg-12', { 'box-right': showBoth}]" v-if="showQuestions">
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
          Question Trainer <a href="/changelog.txt" target="_blank">v{{ applicationVersion }}</a> by <a href="mailto:mikedeklerk@gmail.com">Mike de Klerk</a> &copy; 2019
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
import { version } from '@/../package.json';
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
import ViewMode from '@/components/ViewMode.vue';
import ImportExport from '@/components/ImportExport.vue';
import FirebaseAuthenticate from '@/firebase/FirebaseAuthenticate.vue';
import ObjectExt from '@/utils/ObjectExt';
import * as firebase from 'firebase';
import 'firebase/firestore';

Vue.use(CKEditor);

@Component({
  components: {
    FirebaseAuthenticate,
    ImportExport,
    Library,
    QuestionList,
    QuestionModal,
    QuestionTrainer,
    ViewMode,
  },
})
export default class App extends mixins(StoreMixin) {
  private get applicationVersion(): string {
    return version;
  }

  private get showBoth(): boolean {
    return this.store.state.viewMode === 'both';
  }

  private get showLibrary(): boolean {
    return this.showBoth || this.store.state.viewMode === 'library' ;
  }

  private get showQuestions(): boolean {
    return this.showBoth || this.store.state.viewMode === 'questions';
  }

  private created(): void {
    this.initialiseFirebase();

    this.store.subscribe((mutation, state) => {
      if (mutation.type === MutationTypes.initialise) { return; }

      const stateString = JSON.stringify(state);
      // TODO: Extract to storage class
      const currentUser = firebase.auth().currentUser;
      if (currentUser === null || currentUser.uid === null) {
        console.log('Save local');
        localStorage.setItem('store', stateString);
      } else {
        console.log('Save online');
        // TODO: Secure database write
        // https://firebase.google.com/docs/firestore/quickstart#secure_your_data
        const db = firebase.firestore();
        const libData: any = { data: stateString};
        const libraries = db.collection('libraries');
        libraries.doc(currentUser.uid).set(libData);
      }
    });

    this.store.commit(MutationTypes.initialise);
  }

  private initialiseFirebase(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyCNIx6ApCaIH-BQlz09DmLSh8iTtWpgPMs',
      authDomain: 'question-trainer.firebaseapp.com',
      databaseURL: 'https://question-trainer.firebaseio.com',
      projectId: 'question-trainer',
      storageBucket: 'question-trainer.appspot.com',
      messagingSenderId: '1000408574113',
      appId: '1:1000408574113:web:9f757273752d73753068e0',
      measurementId: 'G-WRBFK0PL4X',
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
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

.view-mode {
  width: 220px;
}

.flex-container {
  display: flex;
}
</style>
