import Vuex, { StoreOptions } from 'vuex';
import IState from '@/state/IState';
import Book from '@/models/Book';
import MutationTypes from '@/state/MutationTypes';
import Vue from 'vue';
import _ from 'lodash';

const storeOptions: StoreOptions<IState> = {
  state: {
    books: new Array<Book>(),
  },
  mutations: {
    [MutationTypes.addBook]: (state, book: Book) => {
      state.books.push(book);
    },

    [MutationTypes.removeBookById]: (state, bookId: string) => {
      const index = _.findIndex(state.books, (b) => {
        return b.id === bookId;
      });
      if (index === -1) { return; }

      state.books.splice(index, 1);
    },

    [MutationTypes.setBooks]: (state, books: Book[]) => {
      Vue.set(state, 'books', books);
    },
  },
};

Vue.use(Vuex);
export default new Vuex.Store<IState>(storeOptions);
