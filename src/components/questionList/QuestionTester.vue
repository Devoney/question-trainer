<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-10">Question tester</div>
        <div class="col-2 text-right">
          <button :class="['btn', {'btn-primary': canStart, 'btn-secondary': !canStart}]" @click="start" :disabled="!canStart">Start</button>
        </div>
      </div>
    </div>
    <div class="card-body text-left">
      <div class="font-weight-bold">Question:</div>
      <div>This is my question?</div>
      <div class="font-weight-bold answer">Answer:</div>
      <div
        class="show-answer-banner"
        v-if="!showAnswer"
        @click="showAnswer = true"
      >Click here to show the answer</div>
      <div v-if="showAnswer">This is my answer</div>
      <ckeditor :editor="editor" v-model="answer" :config="editorConfig"></ckeditor>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-2 text-left">
          <button class="btn btn-danger" @click="answerIsWrong">Wrong</button>
        </div>
        <div class="col-8"></div>
        <div class="col-2 text-right">
          <button class="btn btn-success" @click="answerIsCorrect">Correct</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    CKEditor,
  },
})
export default class QuestionTester extends mixins(StoreMixin) {
  private answer: string = '';
  private editor: any = ClassicEditor;
  private editorConfig: any = {
    removePlugins: [
      'EasyImage',
      'Heading',
      'ImageCaption',
      'ImageUpload',
      'ImageToolbar',
      'MediaEmbed',
    ],
    toolbar: [
      // 'heading',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      // 'imageUpload',
      'blockQuote',
      'insertTable',
      // 'mediaEmbed',
      'undo',
      'redo',
    ],
  };
  private showAnswer: boolean = false;

  private get canStart(): boolean {
    return this.store.state.questionList.length > 0;
  }

  private answerIsCorrect(): void {

  }

  private answerIsWrong(): void {

  }

  private start(): void {

  }
}
</script>

<style scoped>
.answer {
  margin-top: 10px;
}

.correct-wrong-buttons {
  margin-top: 10px;
}

.show-answer-banner {
  cursor: pointer;
}
</style>