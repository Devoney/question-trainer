<template>
  <div>
    <div v-if="!isLoggedIn" id="firebaseui-auth-container"></div>
    <div v-if="isLoggedIn">
      <span>
        <img width="32" height="32" :src="imageSrc" />
      </span>
      <span>Logged in as {{displayName}} ({{email}}).</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Component
export default class FirebaseAuthenticate extends mixins(StoreMixin) {

  private displayName: string = '';
  private email: string = '';
  private imageSrc: string = '';

  private get isLoggedIn(): boolean {
    return this.email !== '';
  }

  public created(): void {
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

  public mounted(): void {
    const auth = firebase.auth();
    const ui = new firebaseui.auth.AuthUI(auth);
    const self = this;

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          self.displayName = authResult.user.displayName;
          self.email = authResult.user.email;
          self.imageSrc = authResult.user.photoURL;
          self.store.state.credential = authResult.credential;
          return false;
        },
      },
    });
  }
}
</script>

<style scoped>
</style>