import Vuex, { StoreOptions } from 'vuex';
import IState from '@/state/IState';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import MutationTypes from '@/state/MutationTypes';
import Vue from 'vue';
import _ from 'lodash';

const storeOptions: StoreOptions<IState> = {
  state: {
    books: new Array<Book>(),
    bookSelected: undefined,
  },
  mutations: {
    [MutationTypes.addBook]: (state, book: Book) => {
      state.books.push(book);
    },

    [MutationTypes.addChapter]: (state, chapter: Chapter) => {
      if (state.bookSelected === undefined) {
        throw new Error('No book was selected. So chapter could not be added.');
      }
      state.bookSelected.chapters.push(chapter);
    },

    [MutationTypes.removeBookById]: (state, bookId: string) => {
      const index = _.findIndex(state.books, (b) => {
        return b.id === bookId;
      });
      if (index === -1) { return; }

      const book = state.books.splice(index, 1)[0];
      if (book.chapters !== undefined && book.chapters.length > 0) {
        book.chapters.splice(0, book.chapters.length);
      }
    },

    [MutationTypes.setBooks]: (state, books: Book[]) => {
      Vue.set(state, 'books', books);
    },

    [MutationTypes.setSelectedBook]: (state, book: Book) => {
      state.bookSelected = book;
    },
  },
};

Vue.use(Vuex);
export default new Vuex.Store<IState>(storeOptions);
