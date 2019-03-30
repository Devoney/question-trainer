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

  private ok(): void {
    if (!this.canExecute) { return; }

    const id = uuid();
    const chapter = new Chapter(id, this.chapter.nr.toString(), this.chapter.title);

    this.store.commit(MutationTypes.addChapter, chapter);

    this.chapter.title = '';
    this.chapter.nr = '';
  }

  protected chapterNumberExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase();
    }) !== -1;
  }

  protected titleExists(): boolean {
    return _.findIndex(this.chapters, (chapter) => {
      return chapter.title.toLowerCase() === this.chapter.title.toLowerCase();
    }) !== -1;
  }

  private cancel(): void {
    this.resetData();
  }
}
</script>
