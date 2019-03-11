<template>
  <div class="form-group">
    <div class="row">
      <div class="col text-left">
      <label class="font-weight-bold" for="bookTitleText">Title:</label>
      </div>
    </div>
    <div class="input-group row no-gutters">
      <input class="form-control" id="bookTitleText" type="text" v-model.trim="bookTitle">
      <div class="input-group-append">
        <button class="btn btn-primary input-group-append" id="btn-add-book" @click="add">Add</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AddBook extends Vue {

  private data() {
    return {
      bookTitle: undefined,
    };
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
</style>