<template>
  <tr>
    <td class="text-center" style="width: 70px;">
    </td>
    <td class="text-right" aria-label="Chapter number" style="width: 70px;">
      {{ chapter.nr }}
    </td>
    <td class="text-left" aria-label="Title of chapter">{{ chapter.title }}</td>
    <td class="text-center" style="width: 120px;" aria-label="Number of questions in this chapter">{{ nrOfQuestions }}</td>
    <td class="text-center">
      <icon-button icon="edit" label="Edit chapter" :argument="chapter" @click="edit" :disabled="chapterInEditMode"/>
      <icon-button icon="trash-alt" label="Trash chapter" @click="trash" :argument="chapter" :disabled="chapterInEditMode"/>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import bus from '@/MessageBus';
import Chapter from '@/models/Chapter';
import IconButton from '@/components/IconButton.vue';
import { mixins } from 'vue-class-component';
import MutationTypes from '@/state/MutationTypes';
import QuestionModalArgs from '@/types/QuestionModalArgs';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    IconButton,
  },
})
export default class ChapterRecord extends mixins(StoreMixin) {
  @Prop() public chapter!: Chapter;

  get chapterInEditMode(): boolean {
    if (this.store.state.chapterEdited === undefined) { return false; }
    return this.store.state.chapterEdited.id === this.chapter.id;
  }

  get nrOfQuestions() {
    if (this.chapter.questions === undefined) { return 0; }
    return this.chapter.questions.length;
  }

  private trash(chapter: Chapter) {
    const args = new QuestionModalArgs(
      'Delete chapter',
      'Are you sure you want to delete this chapter?',
      this.trashConfirmed,
      'Yes',
      'No',
    );
    bus.showQuestionModal(args);
  }

  private trashConfirmed(): void {
    this.store.commit(MutationTypes.Chapter.removeChapterById, this.chapter.id);
  }

  private edit(chapter: Chapter): void {
    this.store.commit(MutationTypes.Chapter.setEditedChapter, chapter);
  }
}
</script>

<style scoped>
.btn-group-xs > .btn,
.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 0.5;
  border-radius: 0.2rem;
}
</style>