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
          :disabled="!chapterIsSelected || !hasQuestion"
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
          :class="['btn', {'btn-primary': chapterSelected, 'btn-secondary': !chapterSelected}]"
          @click="add"
          :disabled="!chapterSelected"
        >Add</button>
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
import ckeditor from '@ckeditor/ckeditor5-vue';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

@Component({
  components: {
    BookSelector,
    ChapterSelector,
    ckeditor,
  },
})
export default class AddQuestion extends mixins(StoreMixin) {
  private pageNr: string = '1';
  private editor: any = ClassicEditor;
  private question: string = '';
  private answer: string = '';
  private editorConfig: any = {

  };

  get bookIsSelected(): boolean {
    return this.store.state.bookSelected !== undefined;
  }

  get chapterIsSelected(): boolean {
    return this.chapterSelected !== undefined;
  }

  get chapterSelected(): Chapter | undefined {
    return this.store.state.chapterSelected;
  }

  get hasQuestion() {
    return !_.isEmpty(this.question);
  }

  private add(): void {
    if (_.isEmpty(this.question) || _.isEmpty(this.answer)) { return; }

    const id = uuid();
    const question = new Question(
      id,
      this.question,
      this.answer,
      this.pageNr,
    );

    this.store.commit(MutationTypes.Question.addQuestion, question);
    this.clear();
  }

  private clear(): void {
    this.question = '';
    this.answer = '';
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