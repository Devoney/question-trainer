<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import uuid from 'uuid/v1';
import Chapter from '@/models/Chapter';
import IState from '@/state/IState';
import MutationTypes from '@/state/MutationTypes';
import ChapterBase from '@/components/chapters/ChapterBase.vue';

@Component
export default class AddChapter extends ChapterBase {
  protected buttonText: string = 'Add';

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

  @Watch('chapters')
  private chaptersChanged(): void {
    this.numberChanged();
    this.titleChanged();
  }

  private ok(): void {
    if (!this.canExecute) { return; }

    const id = uuid();
    const chapter = new Chapter(id, this.chapter.nr.toString(), this.chapter.title);

    this.store.commit(MutationTypes.addChapter, chapter);

    this.chapter.title = '';
    this.chapter.nr = '';
  }

  private chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase();
    }) !== -1;
  }

  @Watch('chapter.nr')
  private numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.error.nr = 'Chapter already exists for this book.';
      return;
    }

    this.error.nr = '';
  }

  private titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.chapter.title.toLowerCase();
    }) !== -1;
  }

  @Watch('chapter.title')
  private titleChanged(): void {
    if (this.titleExists()) {
      this.error.title = 'Title already exists for this book.';
      return;
    }

    this.error.title = '';
  }

  private cancel(): void {
    this.resetData();
  }
}
</script>
