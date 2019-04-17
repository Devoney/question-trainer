<template>
  <tr>
    <td>
      <add-or-remove remove-color="red" @add="addQuestionToList" @remove="removeQuestionFromList"/>
    </td>
    <td>{{ (index) }}</td>
    <td class="text-left" aria-label="Question" v-html="questionStr()"></td>
    <td class="text-left" aria-label="Answer" v-html="answerStr()"></td>
    <td aria-label="Page number">{{ question.pageNr }}</td>
    <td class="text-center">
      <icon-button
        icon="edit"
        label="Edit question"
        :argument="question"
        @click="edit"
        :disabled="questionInEditMode"
      />
      <icon-button icon="trash-alt" label="Trash question" :argument="question" @click="trash"/>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import bus from '@/MessageBus';
import AddOrRemove from '@/components/AddOrRemove.vue';
import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import { truncateWithDots } from '@/utils/TextTransformers';
import Question from '@/models/Question';
import QuestionModalArgs from '@/types/QuestionModalArgs';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    AddOrRemove,
    IconButton,
  },
})
export default class QuestionRecord extends mixins(StoreMixin) {

  get questionInEditMode(): boolean {
    if (this.store.state.questionEdited === undefined) { return false; }
    return this.store.state.questionEdited.id === this.question.id;
  }

  @Prop({ required: true }) public index !: number;
  @Prop({ required: true }) public question!: Question;
  private maxLengthText: number = 40;

  private answerStr(): string {
    return truncateWithDots(this.question.answer, this.maxLengthText);
  }

  private questionStr(): string {
    return truncateWithDots(this.question.question, this.maxLengthText);
  }

  private edit(question: Question): void {
    this.store.commit(MutationTypes.Question.setEditedQuestion, question);
  }

  private trash(question: Question): void {
    const args = new QuestionModalArgs(
      'Delete question',
      'Are you sure you want to delete this question?',
      this.trashConfirmed,
      'Yes',
      'No',
    );
    bus.showQuestionModal(args);
  }

  private trashConfirmed(): void {
    this.store.commit(MutationTypes.Question.removeQuestionById, this.question.id);
  }

  private addQuestionToList(): void {
    this.store.commit(MutationTypes.QuestionList.addToList, this.question);
  }

  private removeQuestionFromList(): void {
    this.store.commit(MutationTypes.QuestionList.removeFromList, this.question);
  }
}
</script>

<style scoped>
td > p {
  margin: 0px;
  margin-bottom: 0px !important;
  margin-top: 0px;
  padding: 0px;
}
</style>
