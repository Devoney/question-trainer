<template>
  <div>
    <div class="row form-group">
      <div class="col-3 text-left">
        <book-selector />
      </div>
      <div class="col text-left">
        <add-chapter v-if="hasBook" />
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

import AddChapter from '@/components/chapters/AddChapter.vue';
import BookSelector from '@/components/books/BookSelector.vue';
import ChapterTable from '@/components/chapters/ChapterTable.vue';

@Component({
  components: {
    AddChapter,
    BookSelector,
    ChapterTable,
  },
})
export default class ChapterManager extends Vue {
  get store(): Store<IState> {
    return this.$store;
  }

  get hasBook(): boolean {
    return this.store.state.bookSelected !== undefined;
  }
}
</script>

<style scoped>
</style>
