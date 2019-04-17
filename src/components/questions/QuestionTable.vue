<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <th width="40"></th>
        <th width="70">Nr.</th>
        <th class="text-left">Question</th>
        <th class="text-left">Answer</th>
        <th width="70">Page Nr.</th>
        <th width="90"></th>
      </thead>
      <question-record
        v-for="(question, index) in questions"
        v-bind:key="question.id"
        :index="index + 1"
        :question="question"
      />
      <tfoot v-if="!hasQuestions">
        <th colspan="6">No questions</th>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import $ from 'jquery';
import 'bootstrap';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionRecord from '@/components/questions/QuestionRecord.vue';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    QuestionRecord,
  },
})
export default class QuestionTable extends mixins(StoreMixin) {
  private get hasQuestions(): boolean {
    return this.questions.length > 0;
  }

  private get questions(): Question[] {
    const chapterSelected = this.store.state.chapterSelected;
    if (chapterSelected === undefined) { return []; }
    return chapterSelected.questions;
  }
}
</script>

<style scoped>
</style>