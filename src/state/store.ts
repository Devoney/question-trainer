import Vuex, { StoreOptions } from 'vuex';
import IState from '@/state/IState';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import MutationTypes from '@/state/MutationTypes';
import Vue from 'vue';
import _ from 'lodash';
import BookModule from '@/state/modules/BookModule';

Vue.use(Vuex);

const storeOptions: StoreOptions<IState> = {
  state: {
    chapterEdited: undefined,
  },
  mutations: {
    [MutationTypes.addChapter]: (state, chapter: Chapter) => {
      // if (state.book.bookSelected === undefined) {
      //   throw new Error('No book was selected. So chapter could not be added.');
      // }
      // state.bookSelected.chapters.push(chapter);
    },

    [MutationTypes.editChapter]: (state, chapter: { nr: string, title: string }) => {
      if (state.chapterEdited === undefined) {
        throw new Error('Changes are attempted to be saved to chapter, but none is being edited currently.');
      }
      state.chapterEdited.nr = chapter.nr;
      state.chapterEdited.title = chapter.title;
    },

    [MutationTypes.removeChapterById]: (state, chapterId: string) => {
      // if (state.bookSelected === undefined) { return; }

      // const index = _.findIndex(state.bookSelected.chapters, (c) => {
      //   return c.id === chapterId;
      // });
      // if (index === -1) { return; }

      // const chapter = state.bookSelected.chapters.splice(index, 1)[0];
      // if (chapter.questions !== undefined && chapter.questions.length > 0) {
      //   chapter.questions.splice(0, chapter.questions.length);
      // }
    },

    [MutationTypes.setEditedChapter]: (state, chapter: Chapter) => {
      state.chapterEdited = chapter;
    },
  },
};

const store = new Vuex.Store<IState>(storeOptions);
store.registerModule('book', BookModule);
export default store;
