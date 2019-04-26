<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-2 text-left"><clear-button /></div>
        <div class="col-8">
          <h5>
            Question list
            <span
            class="h6"
              v-show="!listHasNoQuestions"
              aria-label="Number of questions in the list."
            >({{ questionsInList.length }})</span>
          </h5>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-striped table-bordered">
        <thead>
          <th width="40"></th>
          <th width="60">#</th>
          <th class="text-left">Question</th>
        </thead>
        <tbody>
          <question-list-record
            v-for="(question, index) in questionsInList"
            v-bind:key="question.id"
            :index="(index + 1)"
            :question="question"
          />
        </tbody>
        <tfoot v-if="listHasNoQuestions">
          <th colspan="3" aria-label="Instructions on how to add a question to the list." class="font-weight-normal">
            Add questions to this list by using the
            <icon-button icon="plus" argument/>button on books, chapters and individual questions.
          </th>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ClearButton from '@/components/questionList/ClearButton.vue';
import IconButton from '@/components/IconButton.vue';
import Question from '@/models/Question';
import QuestionListRecord from '@/components/questionList/QuestionListRecord.vue';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component({
  components: {
    ClearButton,
    IconButton,
    QuestionListRecord,
  },
})
export default class QuestionList extends mixins(StoreMixin) {
  private get listHasNoQuestions(): boolean {
    return this.questionsInList.length === 0;
  }

  private get questionsInList(): Question[] {
    return this.store.state.questionList;
  }
}
</script>

<style scoped>
</style>