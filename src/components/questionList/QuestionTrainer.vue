<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-2 text-left">
          <IconButton
            icon="redo-alt"
            @click="toggleRepeat"
            argument
            :color="repeat ? '#000000' : '#CCCCCC'"
            label="Toggle mode to repeat questions you answered incorrectly."
            size="m"
          />
        </div>
        <div class="col-8 text-center h5">Question trainer</div>
        <div class="col-2 text-right">
          <button
            aria-label="Start training"
            :class="['btn', {'btn-primary': canStart, 'btn-secondary': !canStart}]"
            @click="start"
            :disabled="!canStart"
          >Start</button>
        </div>
      </div>
    </div>
    <div class="card-body text-left">
      <div v-if="!hasQuestion && !hasQuestionsInList" class="text-center">
        <p v-show="showStatistics" aria-label="Recent statistics">
          You finished last training with
          <span class="stats-wrong-count">{{ statistics.wrongCount }}</span> question(s) answered incorrectly and
          <span
            class="stats-correct-count"
          >{{ statistics.correctCount }}</span> correctly.
        </p>
        <span
          aria-label="Instructions to create list"
        >Put together a list of questions below and then start training.</span>
      </div>
      <div
        v-else-if="!hasQuestion && hasQuestionsInList"
        class="text-center"
      >Press Start to begin training!</div>
      <div v-else>
        <div class="font-weight-bold">Question:</div>
        <div aria-label="Question html">
          <ckeditor
            :editor="editorQuestion"
            v-model="questionHtml"
            :config="readOnlyEditorConfig"
            disabled
          ></ckeditor>
        </div>
        <div class="font-weight-bold answer">Your answer:</div>
        <div>
          <ckeditor
            :editor="editorAnswerGiven"
            v-model="answerGiven"
            :config="editorConfig"
            :disabled="showAnswer"
          ></ckeditor>
        </div>
        <div class="font-weight-bold answer">Expected answer:</div>
        <div
          class="show-answer-banner"
          v-show="!showAnswer && hasQuestion"
          @click="showAnswer = true"
        >Click here to show the answer</div>
        <div aria-label="Answer html" v-show="showAnswer">
          <ckeditor
            :editor="editorAnswerExpected"
            v-model="answerHtml"
            :config="readOnlyEditorConfig2"
            disabled
          ></ckeditor>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-2 text-left">
          <button
            aria-label="Wrong answer"
            class="btn btn-danger"
            :disabled="!hasQuestion || !showAnswer"
            @click="answerIsWrong"
          >
            Wrong
            <span v-show="hasQuestion">({{ statistics.wrongCount }})</span>
          </button>
        </div>
        <div class="col-8"></div>
        <div class="col-2 text-right">
          <button
            aria-label="Correct answer"
            class="btn btn-success"
            :disabled="!hasQuestion || !showAnswer"
            @click="answerIsCorrect"
          >
            Correct
            <span v-show="hasQuestion">({{ statistics.correctCount }})</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getRandomInt } from '@/utils/Math';
import { mixins } from 'vue-class-component';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';
import Question from '@/models/Question';
import QuestionTestStatistics from '@/types/QuestionTestStatistics';

@Component({
  components: {
    CKEditor,
    IconButton,
  },
})
export default class extends mixins(StoreMixin) {
  private answerGiven: string = '';
  private editorQuestion: any = ClassicEditor;
  private editorAnswerGiven: any = ClassicEditor;
  private editorAnswerExpected: any = ClassicEditor;
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
      'MathType',
    ],
  };
  private readOnlyEditorConfig: any = {
    removePlugins: [
      'EasyImage',
      'Heading',
      'ImageCaption',
      'ImageUpload',
      'ImageToolbar',
      'MediaEmbed',
    ],
    toolbar: [],
    toolbarStartupExpanded : false,
  };
  private readOnlyEditorConfig2: any = {
    removePlugins: [
      'EasyImage',
      'Heading',
      'ImageCaption',
      'ImageUpload',
      'ImageToolbar',
      'MediaEmbed',
    ],
    toolbar: [],
    toolbarStartupExpanded : false,
  };
  private showAnswer: boolean = false;

  private get answerHtml(): string {
    if (this.question === undefined) { return ''; }
    return this.question.answer;
  }

  private get canStart(): boolean {
    return this.store.state.questionList.length > 0 && !this.hasQuestion;
  }

  private get hasQuestion(): boolean {
    return this.question !== undefined;
  }

  private get hasQuestionsInList(): boolean {
    return this.store.state.questionList.length > 0;
  }

  private get question(): Question | undefined {
    return this.store.state.currentQuestion;
  }

  private get questionHtml(): string {
    if (this.question === undefined) { return ''; }
    return this.question.question;
  }

  private get repeat(): boolean {
    return this.store.state.repeatWrongQuestions;
  }

  private get showStatistics(): boolean {
    return (this.statistics.wrongCount > 0 || this.statistics.correctCount > 0);
  }

  private get statistics(): QuestionTestStatistics {
    return this.store.state.questionTestStatistics;
  }

  private answerIsCorrect(): void {
    this.answerGiven = '';
    this.incrementCorrectCount();
    this.setNextQuestion();
  }

  private answerIsWrong(): void {
    this.answerGiven = '';
    this.incrementWrongCount();
    if (this.repeat) {
      this.store.commit(MutationTypes.QuestionList.addToList, this.question);
    }
    this.setNextQuestion();
  }

  private start(): void {
    this.resetCount();
    this.setNextQuestion();
  }

  private setNextQuestion(): void {
    this.showAnswer = false;
    const question = this.takeQuestion();
    this.store.commit(MutationTypes.QuestionTrainer.setCurrentQuestion, question);
    if (question !== undefined) {
      this.store.commit(MutationTypes.QuestionList.removeFromList, question);
    }
  }

  private toggleRepeat(): void {
    this.store.commit(MutationTypes.QuestionTrainer.toggleRepeat);
  }

  private incrementCorrectCount(): void {
    const correctCount = this.store.state.questionTestStatistics.correctCount + 1;
    this.store.commit(MutationTypes.QuestionTrainer.setStatistics, { correctCount });
  }

  private incrementWrongCount(): void {
    const wrongCount = this.store.state.questionTestStatistics.wrongCount + 1;
    this.store.commit(MutationTypes.QuestionTrainer.setStatistics, { wrongCount });
  }

  private resetCount(): void {
    this.store.commit(MutationTypes.QuestionTrainer.setStatistics, {
      correctCount: 0,
      wrongCount: 0,
    });
  }

  private takeQuestion(): Question | undefined {
    if (this.store.state.questionList.length === 0) { return undefined; }
    const questionIndex = getRandomInt(0, this.store.state.questionList.length - 1);
    const question = this.store.state.questionList[questionIndex];
    return question;
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

.stats-wrong-count {
  color: red;
  font-weight: bold;
}

.stats-correct-count {
  color: green;
  font-weight: bold;
}
</style>