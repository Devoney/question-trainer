<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <th></th>
        <th>Nr.</th>
        <th class="text-left">Title</th>
        <th>Nr of
          <br>questions
        </th>
        <th></th>
      </thead>
      <tbody>
        <chapter-record
          v-for="(chapter) in chapters"
          v-bind:key="chapter.id"
          :chapter="chapter"
        />
      </tbody>
      <tfoot v-if="!hasChapters">
        <th colspan="6">No chapters</th>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';

import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';

import AddOrRemove from '@/components/AddOrRemove.vue';
import ChapterRecord from '@/components/chapters/ChapterRecord.vue';

@Component({
  components: {
    AddOrRemove,
    ChapterRecord,
  },
})
export default class ChapterTable extends Vue {
  @Prop() public bookSelected!: Book;

  get chapters(): Chapter[] {
    if (this.bookSelected === undefined || this.bookSelected.chapters === undefined) { return []; }
    return this.bookSelected.chapters;
  }

  get hasChapters(): boolean {
    return this.chapters.length > 0;
  }

  get store(): Store<IState> {
    return this.$store;
  }
}
</script>

<style scoped>
</style>