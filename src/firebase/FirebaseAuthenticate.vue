<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <div v-if="isLoggedIn">
      <span>
        <img width="32" height="32" :src="imageSrc" />
      </span>
      <span>Logged in as {{displayName}} ({{email}}).</span>
      <span><a href="#" @click="logOut">Logout</a></span>
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
  private isLoggedIn: boolean = false;
  private firebaseUi: firebaseui.auth.AuthUI | undefined = undefined;

  public mounted(): void {
    const auth = firebase.auth();
    const self = this;

    firebase.auth().onIdTokenChanged((user: any) => {
      this.onIdTokenChanged(user);
    });

    this.showUi(auth);
  }

  onIdTokenChanged(user: any): void {
    if (user) {
        this.setUserData(user);
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }

      this.store.commit(MutationTypes.initialise);
  }

  private showUi(auth: firebase.auth.Auth) {
    const self = this;
    if (this.firebaseUi === undefined) {
      this.firebaseUi = new firebaseui.auth.AuthUI(auth);
    }

    this.firebaseUi.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          self.setUserData(authResult.user);
          return false;
        },
      },
    });
  }

  private setUserData(user: any): void {
    this.displayName = user.displayName;
    this.email = user.email;
    this.imageSrc = user.photoURL;
  }

  private logOut(): void {
    if (!this.isLoggedIn) { return; }
    const auth = firebase.auth();
    auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.showUi(auth);
      this.store.commit(MutationTypes.initialise);
    });
  }
}
</script>

<style scoped>
</style>