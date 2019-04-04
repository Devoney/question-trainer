<template>
  <div>
    <label class="font-weight-bold">Chapter:</label>
    <select class="form-control" v-model="chapterSelected">
      <option v-for="chapter in chapters" v-bind:value="chapter" v-bind:key="chapter.id">{{ chapter.nr + ' - ' + chapter.title }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Chapter from '@/models/Chapter';
import StoreMixin from '@/mixins/StoreMixin';
import IState from '@/state/IState';
import { Store } from 'vuex';
import MutationTypes from '@/state/MutationTypes';

@Component
export default class BookSelector extends mixins(StoreMixin) {
  get chapters(): Chapter[] {
    return this.store.getters.chaptersSortedByTitle;
  }

  get chapterSelected(): Chapter | undefined {
    return this.store.state.chapterSelected;
  }

  set chapterSelected(chapter: Chapter | undefined) {
    this.store.commit(MutationTypes.setSelectedChapter, chapter);
  }
}
</script>
