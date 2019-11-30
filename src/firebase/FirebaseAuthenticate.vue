<template>
  <div id="firebaseui-auth-container"></div>
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

  created(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyCNIx6ApCaIH-BQlz09DmLSh8iTtWpgPMs",
      authDomain: "question-trainer.firebaseapp.com",
      databaseURL: "https://question-trainer.firebaseio.com",
      projectId: "question-trainer",
      storageBucket: "question-trainer.appspot.com",
      messagingSenderId: "1000408574113",
      appId: "1:1000408574113:web:9f757273752d73753068e0",
      measurementId: "G-WRBFK0PL4X"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  mounted(): void {
    const auth = firebase.auth();
    const ui = new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          return false;
        },
      },
    });
  }
}
</script>

<style scoped>
</style>