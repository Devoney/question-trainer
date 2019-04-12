<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <th>Nr.</th>
        <th class="text-left">Question</th>
        <th class="text-left">Answer</th>
        <th>Page Nr.</th>
        <th></th>
      </thead>
      <question-record
        v-for="(question) in questions"
        v-bind:key="question.id"
        :index="1"
        :question="question"
      />
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionRecord from '@/components/questions/QuestionRecord.vue';

@Component({
  components: {
    QuestionRecord,
  },
})
export default class QuestionTable extends mixins(StoreMixin) {
  private get questions(): Question[] {
    const chapterSelected = this.store.state.chapterSelected;
    if (chapterSelected === undefined) { return []; }
    return chapterSelected.questions;
  }
}
</script>

<style scoped>
</style>