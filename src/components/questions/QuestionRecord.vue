<template>
  <tr>
    <td>{{ (index) }}</td>
    <td class="text-left" aria-label="Question">{{ question.question }}</td>
    <td class="text-left" aria-label="Answer">{{ question.answer }}</td>
    <td aria-label="Page number">{{ question.pageNr }}</td>
    <td class="text-center">
      <icon-button icon="edit" label="Edit question" :argument="question" @click="edit" :disabled="questionInEditMode"/>
      <icon-button icon="trash-alt" label="Delete question" :argument="question" @click="trash"/>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    IconButton,
  },
})
export default class QuestionRecord extends mixins(StoreMixin) {
  @Prop( { required: true }) public index !: number;
  @Prop( { required: true }) public question!: Question;

  get questionInEditMode(): boolean {
    if (this.store.state.questionEdited === undefined) { return false; }
    return this.store.state.questionEdited.id === this.question.id;
  }

  private edit(question: Question): void {
    this.store.commit(MutationTypes.Question.setEditedQuestion, question);
  }

  private trash(question: Question): void {
    this.$emit('trash', question.id);
  }
}
</script>

<style scoped>
</style>
