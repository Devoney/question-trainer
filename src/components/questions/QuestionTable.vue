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
        @trash="trash"
      />
      <tfoot v-if="!hasQuestions">
        <th colspan="6">No questions</th>
      </tfoot>
    </table>
    <confirmation-modal
      :id="modalId"
      @ok="deleteConfirmed"
      @cancel="deleteCanceled"
      okText="Yes"
      cancelText="No"
      >
      <div class="row">
        <div class="col-3 text-center">
          <font-awesome-icon icon="exclamation-triangle" style="color:orange; font-size:30px;"/>
        </div>
        <div class="col text-left">Are you sure you want to delete this question?</div>
      </div>
    </confirmation-modal>
  </div>
</template>

<script lang="ts">
import $ from 'jquery';
import 'bootstrap';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionRecord from '@/components/questions/QuestionRecord.vue';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    QuestionRecord,
    ConfirmationModal,
  },
})
export default class QuestionTable extends mixins(StoreMixin) {
  private modalId: string = 'confirmation-modal-question-table';
  private questionIdUpForDelete: string = '';

  private get hasQuestions(): boolean {
    return this.questions.length > 0;
  }

  private get questions(): Question[] {
    const chapterSelected = this.store.state.chapterSelected;
    if (chapterSelected === undefined) { return []; }
    return chapterSelected.questions;
  }
  
  private deleteCanceled(): void {
    this.questionIdUpForDelete = '';
  }

  private deleteConfirmed(): void {
    this.store.commit(MutationTypes.Question.removeQuestionById, this.questionIdUpForDelete);
  }

  private trash(questionId: string): void {
    this.questionIdUpForDelete = questionId;
    $('#' + this.modalId).modal();
  }
}
</script>

<style scoped>
</style>