<template>
  <tr>
    <td class="text-center" style="width: 70px;">
    </td>
    <td class="text-right" style="width: 70px;">
      <span aria-label="Index">{{ chapter.nr }}</span>
    </td>
    <td class="text-left">{{ chapter.title }}</td>
    <td class="text-center" style="width: 120px;">{{ nrOfQuestions }}</td>
    <td class="text-center">
      <icon-button icon="edit" label="Edit chapter" :argument="chapter" @click="edit" :disabled="chapterInEditMode"/>
      <icon-button icon="trash-alt" label="Trash chapter" @click="trash" :argument="chapter"/>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Chapter from '@/models/Chapter';
import IconButton from '@/components/IconButton.vue';
import { mixins } from 'vue-class-component';
import MutationTypes from '@/state/MutationTypes';
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
    this.$emit('trash', chapter.id);
  }

  private edit(chapter: Chapter): void {
    this.store.commit(MutationTypes.setEditedChapter, chapter);
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