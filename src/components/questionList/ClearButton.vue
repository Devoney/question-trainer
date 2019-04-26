<template>
  <button
  class="btn btn-secondary"
    @click="clear"
    :disabled="listHasNoQuestions"
    aria-label="Clear question list"
    title="Removes all questions in the list"
  >Clear</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class ClearButton extends mixins(StoreMixin) {
  private get listHasNoQuestions() {
    return this.store.state.questionList === undefined || this.store.state.questionList.length === 0;
  }

  private clear(): void {
    this.store.commit(MutationTypes.QuestionList.clear);
  }
}
</script>

<style scoped>
</style>