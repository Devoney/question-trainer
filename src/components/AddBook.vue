<template>
  <div class="form-group">
    <div class="row">
      <div class="col text-left">
        <label class="font-weight-bold" for="bookTitleText">Title:</label>
      </div>
    </div>
    <div class="input-group row no-gutters">
      <input
        class="form-control"
        :class="{ 'is-invalid': invalidTitle}"
        id="bookTitleText"
        type="text"
        v-model.trim="bookTitle"
        v-on:keydown.enter="add"
      >
      <div class="input-group-append">
        <button
          class="btn input-group-append"
          :class="{ 'btn-primary': !invalidTitle, 'btn-secondary': invalidTitle }"
          :disabled="invalidTitle"
          id="btn-add-book"
          @click="add"
        >Add</button>
      </div>
    </div>
    <div class="row err-message">
      <div class="col text-left">
        <transition name="fade">
          <span v-if="invalidTitle">{{ errorMessage }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AddBook extends Vue {
  @Prop() private errorMessage!: string;

  private data() {
    return {
      bookTitle: undefined,
    };
  }

  get invalidTitle() {
    if (_.isEmpty(this.$data.bookTitle)) { return false; }
    return !_.isEmpty(this.errorMessage);
  }

  @Watch('bookTitle')
  private onBookTitleChanged(newTitle: string, oldTitle: string) {
    this.$emit('title-changed', { old: oldTitle, new: newTitle });
  }

  private add(): void {
    const bookTitle = this.$data.bookTitle;
    if (_.isEmpty(bookTitle)) { return; }
    this.$emit('add', bookTitle);
    this.$data.bookTitle = undefined;
  }
}
</script>

<style scoped>
.err-message {
  color: red;
  height: 24px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>