<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      <add-or-remove remove-color="red" @add="raiseEvent('add')" @remove="raiseEvent('remove')"/>
    </td>
    <td class="text-right" style="width: 70px;">
      <span aria-label="Index">{{ index }}</span>
    </td>
    <td class="text-left">
      <span style="cursor: pointer;" aria-label="Title of book">{{ book.title }}</span>
    </td>
    <td class="text-center">
      <div><span aria-label="Number of chapters">{{ nrOfChapters }}</span></div>
    </td>
    <td class="text-center"><span aria-label="Number of questions">{{ nrOfQuestions }}</span></td>
    <td class="text-center table-col-delete">
      <delete-button label="Trash book" :argument="book" @trash="trash"/>
    </td>
  </tr>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddOrRemove from '@/components/AddOrRemove.vue';
import DeleteButton from '@/components/DeleteButton.vue';

import Book from '@/models/Book';

@Component({
  components: {
    AddOrRemove,
    DeleteButton,
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

  private trash(book: Book): void {
    this.$emit('trash', book.id);
  }
}
</script>
