<template>
  <div>
    <div class="row form-group">
      <div class="col-5 text-left">
        <book-selector />
      </div>
      <div class="col text-left">
        <add-chapter v-show="hasBook && inAddMode" />
        <edit-chapter v-show="hasBook && inEditMode" />
      </div>
    </div>
    <chapter-table v-if="hasBook" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Book from '@/models/Book';
import Chapter from '@/models/Chapter';

import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';
import { mixins } from 'vue-class-component';
import AddChapter from '@/components/chapters/AddChapter.vue';
import EditChapter from '@/components/chapters/EditChapter.vue';
import BookSelector from '@/components/books/BookSelector.vue';
import ChapterTable from '@/components/chapters/ChapterTable.vue';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    AddChapter,
    BookSelector,
    ChapterTable,
    EditChapter,
  },
})
export default class ChapterManager extends mixins(StoreMixin) {
  get hasBook(): boolean {
    return this.store.state.bookSelected !== undefined;
  }

  get inAddMode(): boolean {
    return this.store.state.chapterEdited === undefined;
  }

  get inEditMode(): boolean {
    return !this.inAddMode;
  }
}
</script>

<style scoped>
</style>
