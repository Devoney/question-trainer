import Vue from 'vue';
import _ from 'lodash';

import {
  Module,
  VuexModule,
  Mutation,
} from 'vuex-module-decorators';
import Book from '@/models/Book';
import IBookModuleData from '@/state/modules/IBookModuleData';

@Module({
  namespaced: true,
  name: 'book'
})
export default class BookModule extends VuexModule implements IBookModuleData {
  books: Book[] = new Array<Book>();
  bookSelected: Book | undefined;
  bookEdited: Book | undefined;

  get booksSortedByTitle () {
    return _.orderBy(this.books, (book: Book) => {
      return book.title.toLowerCase();
    });
  }

  @Mutation
  addBook(book: Book) {
    this.books.push(book);
  }

  @Mutation
  removeBookById(bookId: string) {
    const index = _.findIndex(this.books, (b) => {
      return b.id === bookId;
    });
    if (index === -1) { return; }

    const book = this.books.splice(index, 1)[0];
    if (this.bookSelected !== undefined && this.bookSelected.id === book.id) {
      this.bookSelected = undefined;
    }
    if (book.chapters !== undefined && book.chapters.length > 0) {
      book.chapters.splice(0, book.chapters.length);
    }
  }

  @Mutation
  setBooks (books: Book[]) {
    Vue.set(this, 'books', books);
  }

  @Mutation
  setEditedBook (book: Book) {
    this.bookEdited = book;
  }

  @Mutation
  setSelectedBook (book: Book) {
    this.bookSelected = book;
  }
}