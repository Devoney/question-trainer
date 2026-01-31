<template>
  <div>
    <add-question />
    <question-table class="question-table" v-show="showQuestionTable"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddQuestion from '@/components/questions/AddQuestion.vue';
import { mixins } from 'vue-class-component';
import MutationTypes from '@/state/MutationTypes';
import QuestionTable from '@/components/questions/QuestionTable.vue';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    AddQuestion,
    QuestionTable,
  },
})
export default class QuestionManager extends mixins(StoreMixin) {
  private get showQuestionTable(): boolean {
    return this.store.state.chapterSelected !== undefined;
  }
}
</script>

<style scoped>
.question-table {
  margin-top:20px;
}
</style>