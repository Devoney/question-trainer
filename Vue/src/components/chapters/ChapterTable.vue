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
        <th width="90"></th>
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
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    AddOrRemove,
    ChapterRecord,
  },
})
export default class ChapterTable extends mixins(StoreMixin) {
  get chapters(): Chapter[] {
    const bookSelected = this.store.state.bookSelected;
    if (bookSelected === undefined || bookSelected.chapters === undefined) { return []; }
    return bookSelected.chapters;
  }

  get hasChapters(): boolean {
    return this.chapters.length > 0;
  }
}
</script>

<style scoped>
</style>