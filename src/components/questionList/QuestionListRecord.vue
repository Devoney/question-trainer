<template>
  <tr>
    <td><icon-button icon="minus" color="red" :argument="question" @click="removeFromQuestionList"/></td>
    <td>{{ index }}</td>
    <td>{{ questionText }}</td>
  </tr>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { truncateWithDots } from '@/utils/TextTransformers';

import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    IconButton,
  },
})
export default class QuestionListRecord extends mixins(StoreMixin) {
  @Prop() public index!: number;
  @Prop() public question!: Question;

  private get questionText(): string {
    return truncateWithDots(this.question.question, 60);
  }

  private removeFromQuestionList(question: Question): void {
    this.store.commit(MutationTypes.QuestionList.removeFromList, question);
  }
}
</script>

<style scoped>
</style>
