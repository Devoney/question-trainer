<template>
  <table class="table table-striped table-bordered">
    <thead>
      <th></th>
      <th>Nr</th>
      <th>Title</th>
      <th>Nr of<br>chapters</th>
      <th>Nr of<br>questions</th>
      <th></th>
    </thead>
    <tbody>
      <book-record
        v-for="(book, index) in books"
        v-bind:key="book.id"
        :book="book"
        :index="index+1"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BookRecord from '@/components/BookRecord.vue';
import Book from '@/models/Book';

@Component({
  components: {
    BookRecord,
  },
})
export default class BookTable extends Vue {
  @Prop() private books!: Book[];
}
</script>

<style scoped>
</style>