<template>
  <div>
    <div class="row">
      <div class="col-5 text-left">
        <book-selector/>
      </div>
      <div class="col-5 text-left">
        <chapter-selector v-show="bookIsSelected"/>
      </div>
      <div class="col text-left">
        <div v-show="chapterIsSelected">
          <label class="font-weight-bold">Page #:</label>
          <div class="input-group row no-gutters">
            <input class="form-control" min="1" max="9999" type="number" v-model="pageNr">
          </div>
        </div>
      </div>
    </div>
    <div class="row ckeditorrow">
      <div class="col text-left">
        <label class="font-weight-bold">Question:</label>
        <ckeditor
          :disabled="!chapterIsSelected"
          :editor="editor"
          v-model="question"
          :config="editorConfig"
          ref="questionEditor"
        ></ckeditor>
      </div>
    </div>
    <div class="row ckeditorrow">
      <div class="col text-left">
        <label class="font-weight-bold">Answer:</label>
        <ckeditor
          :disabled="(!chapterIsSelected || !hasQuestion) && !hasAnswer"
          :editor="editor"
          v-model="answer"
          :config="editorConfig"
          ref="answerEditor"
        ></ckeditor>
      </div>
    </div>
    <div class="row button-row">
      <div class="col text-right">
        <button
          :class="['btn', {'btn-primary': canSave, 'btn-secondary': !canSave}]"
          @click="addOrEdit"
          :disabled="!chapterSelected"
        >{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import BookSelector from '@/components/books/BookSelector.vue';
import ChapterSelector from '@/components/chapters/ChapterSelector.vue';
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

@Component({
  components: {
    BookSelector,
    ChapterSelector,
    CKEditor,
  },
})
export default class AddQuestion extends mixins(StoreMixin) {
  private pageNr: string = '1';
  private editor: any = ClassicEditor;
  private question: string = '';
  private answer: string = '';
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

  get bookIsSelected(): boolean {
    return this.store.state.bookSelected !== undefined;
  }

  get buttonText(): string {
    return (this.inEditMode) ? 'Edit' : 'Add';
  }

  get canSave(): boolean {
    return (!_.isEmpty(this.question) && !_.isEmpty(this.answer));
  }

  get chapterIsSelected(): boolean {
    return this.chapterSelected !== undefined;
  }

  get chapterSelected(): Chapter | undefined {
    return this.store.state.chapterSelected;
  }

  get hasAnswer() {
    return !_.isEmpty(this.answer);
  }

  get hasQuestion() {
    return !_.isEmpty(this.question);
  }

  get inEditMode() {
    return this.store.state.questionEdited !== undefined;
  }

  @Watch('store.state.questionEdited')
  private onInEditMode(): void {
    if (this.inEditMode) {
      const question = this.store.state.questionEdited;
      if (question === undefined) { return; }
      this.question = question.question;
      this.answer = question.answer;
      this.pageNr = question.pageNr;
    } else {
      this.clear();
    }
  }

  private addOrEdit(): void {
    if (!this.canSave) { return; }

    const id = uuid();
    const question = new Question(
      id,
      this.question,
      this.answer,
      this.pageNr,
    );

    const mutationType = (this.inEditMode) ? MutationTypes.Question.editQuestion : MutationTypes.Question.addQuestion;
    this.store.commit(mutationType, question);
    if (this.inEditMode) {
      this.store.commit(MutationTypes.Question.setEditedQuestion, undefined);
    }
    this.clear();
  }

  private clear(): void {
    this.question = '';
    this.answer = '';
    this.pageNr = '1';
    this.setFocusToQuestionEditor();
  }

  private setFocusToQuestionEditor(): void {
    const questionEditor = this.$refs.questionEditor;

    // @ts-ignore
    if (questionEditor.instance !== undefined) {
      // @ts-ignore
      questionEditor.instance.editing.view.focus();
    }
  }
}
</script>

<style scoped>
.ckeditorrow {
  margin-top: 20px;
}

.button-row {
  margin-top: 15px;
}
</style>