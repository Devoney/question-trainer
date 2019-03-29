import Vuex, { StoreOptions } from 'vuex';
import IState from '@/state/IState';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import MutationTypes from '@/state/MutationTypes';
import Vue from 'vue';
import _ from 'lodash';

Vue.use(Vuex);

const storeOptions: StoreOptions<IState> = {
  state: {
    books: new Array<Book>(),
    bookSelected: undefined,
    bookEdited: undefined,
    chapterEdited: undefined,
  },
  getters: {
    booksSortedByTitle: (state) => {
      return _.orderBy(state.books, (book: Book) => {
        return book.title.toLowerCase();
      });
    },
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

    [MutationTypes.editChapter]: (state, chapter: { nr: string, title: string }) => {
      if (state.chapterEdited === undefined) { 
        throw new Error('Changes are attempted to be saved to chapter, but none is being edited currently.');
      }
      state.chapterEdited.nr = chapter.nr;
      state.chapterEdited.title = chapter.title;
    },

    [MutationTypes.removeBookById]: (state, bookId: string) => {
      const index = _.findIndex(state.books, (b) => {
        return b.id === bookId;
      });
      if (index === -1) { return; }

      const book = state.books.splice(index, 1)[0];
      if (state.bookSelected !== undefined && state.bookSelected.id === book.id) {
        state.bookSelected = undefined;
      }
      if (book.chapters !== undefined && book.chapters.length > 0) {
        book.chapters.splice(0, book.chapters.length);
      }
    },

    [MutationTypes.removeChapterById]: (state, chapterId: string) => {
      if (state.bookSelected === undefined) { return; }

      const index = _.findIndex(state.bookSelected.chapters, (c) => {
        return c.id === chapterId;
      });
      if (index === -1) { return; }

      const chapter = state.bookSelected.chapters.splice(index, 1)[0];
      if (chapter.questions !== undefined && chapter.questions.length > 0) {
        chapter.questions.splice(0, chapter.questions.length);
      }
    },

    [MutationTypes.setBooks]: (state, books: Book[]) => {
      Vue.set(state, 'books', books);
    },

    [MutationTypes.setEditedBook]: (state, book: Book) => {
      state.bookEdited = book;
    },

    [MutationTypes.setEditedChapter]: (state, chapter: Chapter) => {
      state.chapterEdited = chapter;
    },

    [MutationTypes.setSelectedBook]: (state, book: Book) => {
      state.bookSelected = book;
    },
  },
};

export default new Vuex.Store<IState>(storeOptions);
