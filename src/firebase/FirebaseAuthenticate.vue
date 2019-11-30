<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

@Component
export default class FirebaseAuthenticate extends mixins(StoreMixin) {
  private mounted(): void {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
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