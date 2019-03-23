<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      <add-or-remove remove-color="red" @add="raiseEvent('add')" @remove="raiseEvent('remove')"/>
    </td>
    <td class="text-right" style="width: 70px;">
      <span aria-label="Index">{{ chapter.nr }}</span>
    </td>
    <td class="text-left">{{ chapter.title }}</td>
    <td class="text-center">{{ nrOfQuestions }}</td>
    <td></td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Chapter from '@/models/Chapter';

import AddOrRemove from '@/components/AddOrRemove.vue';

@Component({
  components: {
    AddOrRemove,
  },
})
export default class ChapterRecord extends Vue {
  @Prop() public chapter!: Chapter;

  get nrOfQuestions() {
    if (this.chapter.questions === undefined) { return 0; }
    return this.chapter.questions.length;
  }
}
</script>

<style scoped>
</style>