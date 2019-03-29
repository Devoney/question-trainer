<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import uuid from 'uuid/v1';
import Chapter from '@/models/Chapter';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import ChapterBase from '@/components/chapters/ChapterBase.vue';

@Component
export default class EditChapter extends ChapterBase {
  protected buttonText: string = 'Edit';

  get chapters(): Chapter[] {
    if (this.store.state.bookSelected === undefined) { return []; }
    return this.store.state.bookSelected.chapters;
  }

  get canExecute() {
    return !this.hasError
      && !_.isEmpty(this.chapter.nr)
      && !_.isEmpty(this.chapter.title)
      && !this.chapterNumberExists()
      && !this.titleExists();
  }

  get hasError() {
    return !_.isEmpty(this.error.title) || !_.isEmpty(this.error.nr);
  }

  @Watch('store.state.chapterEdited')
  private onChapterEdited() {
    const chapterEdited = this.store.state.chapterEdited;
    if (chapterEdited === undefined) { return; }
    this.chapter.id = chapterEdited.id;
    this.chapter.nr = chapterEdited.nr;
    this.chapter.title = chapterEdited.title;
  }

  @Watch('chapters')
  private chaptersChanged(): void {
    this.numberChanged();
    this.titleChanged();
  }

  private ok(): void {
    if (!this.canExecute) { return; }

    this.store.commit(MutationTypes.editChapter, this.chapter);

    this.cancel();
  }

  private chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase() && chapter.id !== this.chapter.id;
    }) !== -1;
  }

  private numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.error.nr = 'Chapter already exists for this book.';
      return;
    }

    this.error.nr = '';
  }

  private titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.chapter.title.toLowerCase() && chapter.id !== this.chapter.id;;
    }) !== -1;
  }

  private titleChanged(): void {
    if (this.titleExists()) {
      this.error.title = 'Title already exists for this book.';
      return;
    }

    this.error.title = '';
  }

  private cancel(): void {
    this.resetData();
    this.store.commit(MutationTypes.setEditedChapter, undefined);
  }
}
</script>
