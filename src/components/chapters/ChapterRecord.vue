<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      
    </td>
    <td class="text-right" style="width: 70px;">
      <span aria-label="Index">{{ chapter.nr }}</span>
    </td>
    <td class="text-left">{{ chapter.title }}</td>
    <td class="text-center" style="width: 120px;">{{ nrOfQuestions }}</td>
    <td class="text-center table-col-delete">
      <button class="btn btn-xs" aria-label="Trash book" @click="raiseEvent('trash')">
        <font-awesome-icon icon="trash-alt"/>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Chapter from '@/models/Chapter';

@Component
export default class ChapterRecord extends Vue {
  @Prop() public chapter!: Chapter;

  get nrOfQuestions() {
    if (this.chapter.questions === undefined) { return 0; }
    return this.chapter.questions.length;
  }

  private raiseEvent(eventName: string) {
    this.$emit(eventName, this.chapter.id);
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