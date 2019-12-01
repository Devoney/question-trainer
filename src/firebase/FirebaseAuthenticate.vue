<template>
  <div id="firebaseui-auth">
    <div v-show="!isLoggedIn" id="firebaseui-auth-container"></div>
    <div v-if="isLoggedIn">
      <span>
        <a href="https://myaccount.google.com/" target="_blanc">
          <img width="32" height="32" :src="imageSrc" />
        </a>
      </span>
      <span>
        <icon-button 
          id="sign-out-button" 
          icon="sign-out-alt"
          label="Sign out"
          size="l"
          @click="signOut" 
          argument=""/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import IconButton from '@/components/IconButton.vue';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Component({
  components: {
    IconButton,
  },
})
export default class FirebaseAuthenticate extends mixins(StoreMixin) {
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

  private onIdTokenChanged(user: any): void {
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
    this.imageSrc = user.photoURL;
  }

  private signOut(): void {
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
#firebaseui-auth {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 1;
}

#sign-out-button {
  margin-left:10px;
  margin-right:5px;
}
</style>