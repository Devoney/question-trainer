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

  protected chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase() && chapter.id !== this.chapter.id;
    }) !== -1;
  }

  protected titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.chapter.title.toLowerCase() && chapter.id !== this.chapter.id;
    }) !== -1;
  }

  @Watch('store.state.chapterEdited')
  private onChapterEdited() {
    this.updateChapter();
  }

  private mounted(): void {
    this.updateChapter();
  }

  private updateChapter(): void {
    const chapterEdited = this.store.state.chapterEdited;
    if (chapterEdited === undefined) { return; }
    this.chapter.id = chapterEdited.id;
    this.chapter.nr = chapterEdited.nr;
    this.chapter.title = chapterEdited.title;
  }

  private ok(): void {
    if (!this.canExecute) { return; }

    this.store.commit(MutationTypes.Chapter.editChapter, this.chapter);

    this.cancel();
  }

  private cancel(): void {
    this.resetData();
    this.store.commit(MutationTypes.Chapter.setEditedChapter, undefined);
  }
}
</script>
