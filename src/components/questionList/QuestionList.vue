<template>
  <div class="card">
    <div class="card-header">Question list</div>
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
            :index="index"
            :question="question"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Question from '@/models/Question';
import QuestionListRecord from '@/components/questionList/QuestionListRecord.vue';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';

@Component({
  components: {
    QuestionListRecord,
  },
})
export default class QuestionList extends mixins(StoreMixin) {
  private get questionsInList(): Question[] {
    return this.store.state.questionList;
  }
}
</script>

<style scoped>
</style>