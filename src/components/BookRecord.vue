<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      <add-or-remove remove-color="red" @add="raiseEvent('add')" @remove="raiseEvent('remove')"/>
    </td>
    <td class="text-right">
      <span>{{ index }}</span>
    </td>
    <td class="text-left">
      <span style="cursor: pointer;">{{ book.title }}</span>
    </td>
    <td class="text-center">
      <div>{{ nrOfChapters }}</div>
    </td>
    <td class="text-center">{{ nrOfQuestions }}</td>
    <td class="text-center table-col-delete">
      <button class="btn btn-xs" @click="raiseEvent('trash')">
        <font-awesome-icon icon="trash-alt"/>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddOrRemove from '@/components/AddOrRemove.vue';

import Book from '@/models/Book';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faCarAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt);

@Component({
  components: {
    AddOrRemove,
  },
})
export default class BookRecord extends Vue {
  @Prop() private book!: Book;
  @Prop() private index!: number;

  get nrOfQuestions() {
    if (this.nrOfChapters === 0) { return 0; }
    return _.sumBy(this.book.chapters, (c) => c.questions.length);
  }

  get nrOfChapters() {
    if (this.book.chapters === undefined) { return 0; }
    return this.book.chapters.length;
  }

  private raiseEvent(eventName: string) {
    this.$emit(eventName, this.book.id);
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
