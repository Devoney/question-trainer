<template>
  <tr>
    <td width="70"></td>
    <td class="text-left">{{ question.question }}</td>
    <td class="text-left">{{ question.answer }}</td>
    <td width="70">{{ question.pageNr }}</td>
    <td class="text-center">
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

  private trash(question: Question): void {
    this.store.commit(MutationTypes.Question.removeQuestionById, question.id);
  }
}
</script>

<style scoped>
</style>
