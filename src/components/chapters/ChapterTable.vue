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
          @trash="trash"
        />
      </tbody>
      <tfoot v-if="!hasChapters">
        <th colspan="6">No chapters</th>
      </tfoot>
    </table>
      <confirmation-modal
      :id="modalId"
      @ok="deleteConfirmed"
      @cancel="deleteCanceled"
      okText="Yes"
      cancelText="No"
      >
      <div class="row">
        <div class="col-3 text-center">
          <font-awesome-icon icon="exclamation-triangle" style="color:orange; font-size:30px;"/>
        </div>
        <div class="col text-left">Are you sure you want to delete this chapter?</div>
      </div>
    </confirmation-modal>
  </div>
</template>

<script lang="ts">
import $ from 'jquery';
import 'bootstrap';
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
    ConfirmationModal,
  },
})
export default class ChapterTable extends mixins(StoreMixin) {
  private modalId: string = 'confirmation-modal-chapter-table';
  private chapterIdUpForDelete: string = '';

  get chapters(): Chapter[] {
    const bookSelected = this.store.state.bookSelected;
    if (bookSelected === undefined || bookSelected.chapters === undefined) { return []; }
    return bookSelected.chapters;
  }

  get hasChapters(): boolean {
    return this.chapters.length > 0;
  }

  private trash(chapterId: string): void {
    this.chapterIdUpForDelete = chapterId;
    $('#' + this.modalId).modal();
  }

  private deleteConfirmed() {
    this.store.commit(MutationTypes.removeChapterById, this.chapterIdUpForDelete);
  }

  private deleteCanceled() {
    this.chapterIdUpForDelete = '';
  }
}
</script>

<style scoped>
</style>