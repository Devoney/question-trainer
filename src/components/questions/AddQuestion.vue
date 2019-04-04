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
        <ckeditor :disabled="!chapterIsSelected" :editor="editor" v-model="question" :config="editorConfig"></ckeditor>
      </div>
    </div>
    <div class="row ckeditorrow">
      <div class="col text-left">
        <label class="font-weight-bold">Answer:</label>
        <ckeditor :disabled="!chapterIsSelected || !hasQuestion" :editor="editor" v-model="answer" :config="editorConfig"></ckeditor>
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

  };

  get bookIsSelected(): boolean {
    return this.store.state.bookSelected !== undefined;
  }

  get chapterIsSelected(): boolean {
    return this.store.state.chapterSelected !== undefined;
  }

  get hasQuestion() {
    return !_.isEmpty(this.question);
  }

  @Watch('chapterIsSelected')
  private onChapterIsSelected() {
    if (_.isEmpty(this.editorData)) {
      this.editorData = 'Add your question here';
    }
  }
}
</script>

<style scoped>
.ckeditorrow {
  margin-top:20px;
}
</style>