import Vuex, { StoreOptions } from 'vuex';
import IState from '@/state/IState';
import Book from '@/models/Book';
import Chapter from '@/models/Chapter';
import MutationTypes from '@/state/MutationTypes';
import Question from '@/models/Question';
import QuestionTestStatistics from '@/types/QuestionTestStatistics';
import Vue from 'vue';
import _ from 'lodash';
import { version } from '@/../package.json';

Vue.use(Vuex);

const storeOptions: StoreOptions<IState> = {
  state: {
    books: new Array<Book>(),
    bookSelected: undefined,
    bookEdited: undefined,
    chapterEdited: undefined,
    chapterSelected: undefined,
    credential: undefined,
    currentQuestion: undefined,
    libraryName: '',
    questionEdited: undefined,
    questionList: new Array<Question>(),
    questionTestStatistics: new QuestionTestStatistics(),
    repeatWrongQuestions: true,
    version,
    viewMode: 'both',
  },
  getters: {
    booksSortedByTitle: (state) => {
      return _.orderBy(state.books, (book: Book) => {
        return book.title.toLowerCase();
      });
    },

    chaptersSortedByTitle: (state) => {
      if (state.bookSelected === undefined) {
        return [];
      }
      return _.orderBy(state.bookSelected.chapters, (chapter: Chapter) => {
        return chapter.nr.toLowerCase();
      });
    },
  },
  mutations: {
    [MutationTypes.initialise]: (state) => {
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        const storeInJson = localStorage.getItem('store');
        if (storeInJson === null || storeInJson === undefined) { return; }
        const storeObj = JSON.parse(storeInJson);
        store.replaceState(Object.assign(state, storeObj));

        if (state.bookSelected !== undefined) {
          const bookId = state.bookSelected.id;
          state.bookSelected = _.find(state.books, (book: Book) => {
            return book.id === bookId;
          });

          if (state.bookSelected !== undefined) {
            if (state.chapterEdited !== undefined) {
              const id = state.chapterEdited.id;
              state.chapterEdited = _.find(state.bookSelected.chapters, (chapter: Chapter) => {
                return chapter.id === id;
              });
            }

            if (state.chapterSelected !== undefined) {
              const id = state.chapterSelected.id;
              state.chapterSelected = _.find(state.bookSelected.chapters, (chapter: Chapter) => {
                return chapter.id === id;
              });
            }
          }
        }

        state.bookEdited = undefined;
        state.chapterEdited = undefined;
        state.credential = undefined;
      }
    },

    [MutationTypes.viewMode]: (state, viewMode: string) => {
      state.viewMode = viewMode;
    },

    [MutationTypes.Book.addBook]: (state, book: Book) => {
      state.books.push(book);
    },

    [MutationTypes.Book.editBook]: (state, title: string) => {
      if (state.bookEdited === undefined) {
        throw new Error('No book is selected for editing, cannot set title.');
      }
      state.bookEdited.title = title;
    },

    [MutationTypes.Chapter.addChapter]: (state, chapter: Chapter) => {
      if (state.bookSelected === undefined) {
        throw new Error('No book was selected. So chapter could not be added.');
      }
      state.bookSelected.chapters.push(chapter);
    },

    [MutationTypes.Question.addQuestion]: (state, question: Question) => {
      if (state.chapterSelected === undefined) {
        throw new Error('No chapter has been selected to add a question to.');
      }

      state.chapterSelected.questions.push(question);
    },

    [MutationTypes.Chapter.editChapter]: (
      state,
      chapter: { nr: string; title: string },
    ) => {
      if (state.chapterEdited === undefined) {
        throw new Error(
          'Changes are attempted to be saved to chapter, but none is being edited currently.',
        );
      }
      state.chapterEdited.nr = chapter.nr;
      state.chapterEdited.title = chapter.title;
    },

    [MutationTypes.Book.removeBookById]: (state, bookId: string) => {
      const index = _.findIndex(state.books, (b) => {
        return b.id === bookId;
      });
      if (index === -1) {
        return;
      }

      const book = state.books.splice(index, 1)[0];
      if (
        state.bookSelected !== undefined &&
        state.bookSelected.id === book.id
      ) {
        state.bookSelected = undefined;
      }
      if (book.chapters !== undefined && book.chapters.length > 0) {
        book.chapters.splice(0, book.chapters.length);
      }
    },

    [MutationTypes.Chapter.removeChapterById]: (state, chapterId: string) => {
      if (state.bookSelected === undefined) {
        return;
      }

      const index = _.findIndex(state.bookSelected.chapters, (c) => {
        return c.id === chapterId;
      });
      if (index === -1) {
        return;
      }

      const chapter = state.bookSelected.chapters.splice(index, 1)[0];
      if (chapter.questions !== undefined && chapter.questions.length > 0) {
        chapter.questions.splice(0, chapter.questions.length);
      }
    },

    [MutationTypes.Book.setBooks]: (state, books: Book[]) => {
      Vue.set(state, 'books', books);
    },

    [MutationTypes.Book.setEditedBook]: (state, book: Book) => {
      state.bookEdited = book;
    },

    [MutationTypes.Chapter.setEditedChapter]: (state, chapter: Chapter) => {
      state.chapterEdited = chapter;
    },

    [MutationTypes.Book.setSelectedBook]: (state, book: Book) => {
      state.bookSelected = book;
    },

    [MutationTypes.Chapter.setSelectedChapter]: (state, chapter: Chapter) => {
      state.chapterSelected = chapter;
    },

    [MutationTypes.Library.setName]: (state, name: string) => {
      state.libraryName = name;
    },

    [MutationTypes.Question.removeQuestionById]: (
      state,
      questionId: string,
    ) => {
      if (state.chapterSelected === undefined) {
        throw new Error(
          'Cannot delete question because there is no chapter selected.',
        );
      }

      const index: number = _.findIndex(state.chapterSelected.questions, (q) => {
        return q.id === questionId;
      });
      state.chapterSelected.questions.splice(index, 1);
    },

    [MutationTypes.Question.editQuestion]: (state, question: Question) => {
      const q = state.questionEdited;
      if (q === undefined) {
        throw new Error(
          'Cannot edit question as none has been selected for editing.',
        );
      }
      q.answer = question.answer;
      q.pageNr = question.pageNr;
      q.question = question.question;
    },

    [MutationTypes.Question.setEditedQuestion]: (state, question: Question) => {
      state.questionEdited = question;
    },

    [MutationTypes.QuestionList.addToList]: (state, question: Question) => {
      const index = _.findIndex(state.questionList, (q) => {
        return q.id === question.id;
      });
      if (index !== -1) {
        return;
      }

      state.questionList.push(question);
    },

    [MutationTypes.QuestionList.clear]: (state) => {
      state.questionList = [];
    },

    [MutationTypes.QuestionList.removeFromList]: (
      state,
      question: Question,
    ) => {
      const index = _.findIndex(state.questionList, (q) => {
        return q.id === question.id;
      });

      if (index === -1) {
        return;
      }

      state.questionList.splice(index, 1);
    },

    [MutationTypes.QuestionTrainer.setCurrentQuestion]: (state, question) => {
      state.currentQuestion = question;
    },

    [MutationTypes.QuestionTrainer.setStatistics]: (state, statistics: { correctCount: number | undefined, wrongCount: number | undefined }) => {
      if (statistics.correctCount !== undefined) {
        state.questionTestStatistics.correctCount = statistics.correctCount;
      }
      if (statistics.wrongCount !== undefined) {
        state.questionTestStatistics.wrongCount = statistics.wrongCount;
      }
    },

    [MutationTypes.QuestionTrainer.toggleRepeat]: (state) => {
      state.repeatWrongQuestions = !state.repeatWrongQuestions;
    },
  },
};

const store = new Vuex.Store<IState>(storeOptions);
export default store;
