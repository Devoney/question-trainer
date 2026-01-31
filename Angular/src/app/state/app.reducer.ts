import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { Question } from '../models/question';
import { QuestionTestStatistics } from '../types/question-test-statistics';
import * as AppActions from './app.actions';
import { AppState } from './app-state';
import packageJson from '../../../package.json';

export const initialAppState: AppState = {
  books: [],
  bookSelected: undefined,
  bookEdited: undefined,
  chapterEdited: undefined,
  chapterSelected: undefined,
  currentQuestion: undefined,
  libraryName: '',
  questionEdited: undefined,
  questionList: [],
  questionTestStatistics: new QuestionTestStatistics(),
  repeatWrongQuestions: true,
  version: packageJson.version ?? '0.0.0',
  viewMode: 'both'
};

function cloneState(state: AppState): AppState {
  return _.cloneDeep(state);
}

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.hydrateState, (_, { state }) => {
    const hydrated = cloneState(state);
    const selectedBookId = hydrated.bookSelected?.id;
    const selectedChapterId = hydrated.chapterSelected?.id;
    const editedChapterId = hydrated.chapterEdited?.id;

    hydrated.bookSelected = selectedBookId
      ? hydrated.books.find((book) => book.id === selectedBookId)
      : undefined;

    hydrated.bookEdited = undefined;
    hydrated.chapterEdited = undefined;
    hydrated.questionEdited = undefined;
    hydrated.currentQuestion = undefined;
    hydrated.questionList = [];

    if (hydrated.bookSelected) {
      const chapters = hydrated.bookSelected.chapters ?? [];
      hydrated.chapterSelected = selectedChapterId
        ? chapters.find((chapter) => chapter.id === selectedChapterId)
        : undefined;
      hydrated.chapterEdited = editedChapterId
        ? chapters.find((chapter) => chapter.id === editedChapterId)
        : undefined;
    } else {
      hydrated.chapterSelected = undefined;
      hydrated.chapterEdited = undefined;
    }

    return hydrated;
  }),
  on(AppActions.setViewMode, (state, { viewMode }) => ({ ...state, viewMode })),
  on(AppActions.addBook, (state, { book }) => ({
    ...state,
    books: [...state.books, book]
  })),
  on(AppActions.editBookTitle, (state, { title }) => {
    if (!state.bookEdited) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.bookEdited) {
      return state;
    }
    newState.bookEdited.title = title;
    return newState;
  }),
  on(AppActions.addChapter, (state, { chapter }) => {
    if (!state.bookSelected) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.bookSelected) {
      return state;
    }
    newState.bookSelected.chapters.push(chapter);
    return newState;
  }),
  on(AppActions.addQuestion, (state, { question }) => {
    if (!state.chapterSelected) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.chapterSelected) {
      return state;
    }
    newState.chapterSelected.questions.push(question);
    return newState;
  }),
  on(AppActions.editChapter, (state, { nr, title }) => {
    if (!state.chapterEdited) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.chapterEdited) {
      return state;
    }
    newState.chapterEdited.nr = nr;
    newState.chapterEdited.title = title;
    return newState;
  }),
  on(AppActions.removeBookById, (state, { bookId }) => {
    const newState = cloneState(state);
    const index = _.findIndex(newState.books, (book) => book.id === bookId);
    if (index === -1) {
      return state;
    }
    const [book] = newState.books.splice(index, 1);
    if (newState.bookSelected?.id === book.id) {
      newState.bookSelected = undefined;
    }
    if (book.chapters?.length) {
      book.chapters.splice(0, book.chapters.length);
    }
    return newState;
  }),
  on(AppActions.removeChapterById, (state, { chapterId }) => {
    if (!state.bookSelected) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.bookSelected) {
      return state;
    }
    const index = _.findIndex(newState.bookSelected.chapters, (chapter) => chapter.id === chapterId);
    if (index === -1) {
      return state;
    }
    const [chapter] = newState.bookSelected.chapters.splice(index, 1);
    if (chapter.questions?.length) {
      chapter.questions.splice(0, chapter.questions.length);
    }
    if (newState.chapterSelected?.id === chapterId) {
      newState.chapterSelected = undefined;
    }
    return newState;
  }),
  on(AppActions.setBooks, (state, { books }) => ({
    ...state,
    books
  })),
  on(AppActions.setEditedBook, (state, { book }) => ({ ...state, bookEdited: book })),
  on(AppActions.setEditedChapter, (state, { chapter }) => ({ ...state, chapterEdited: chapter })),
  on(AppActions.setSelectedBook, (state, { book }) => ({ ...state, bookSelected: book })),
  on(AppActions.setSelectedChapter, (state, { chapter }) => ({ ...state, chapterSelected: chapter })),
  on(AppActions.setLibraryName, (state, { name }) => ({ ...state, libraryName: name })),
  on(AppActions.removeQuestionById, (state, { questionId }) => {
    if (!state.chapterSelected) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.chapterSelected) {
      return state;
    }
    const index = _.findIndex(newState.chapterSelected.questions, (question) => question.id === questionId);
    if (index === -1) {
      return state;
    }
    newState.chapterSelected.questions.splice(index, 1);
    return newState;
  }),
  on(AppActions.editQuestion, (state, { question }) => {
    if (!state.questionEdited) {
      return state;
    }
    const newState = cloneState(state);
    if (!newState.questionEdited) {
      return state;
    }
    newState.questionEdited.answer = question.answer;
    newState.questionEdited.pageNr = question.pageNr;
    newState.questionEdited.question = question.question;
    return newState;
  }),
  on(AppActions.setEditedQuestion, (state, { question }) => ({ ...state, questionEdited: question })),
  on(AppActions.addToQuestionList, (state, { question }) => {
    const exists = state.questionList.some((q) => q.id === question.id);
    if (exists) {
      return state;
    }
    return { ...state, questionList: [...state.questionList, question] };
  }),
  on(AppActions.clearQuestionList, (state) => ({ ...state, questionList: [] })),
  on(AppActions.removeFromQuestionList, (state, { question }) => {
    const index = state.questionList.findIndex((q) => q.id === question.id);
    if (index === -1) {
      return state;
    }
    const newList = [...state.questionList];
    newList.splice(index, 1);
    return { ...state, questionList: newList };
  }),
  on(AppActions.setCurrentQuestion, (state, { question }) => ({ ...state, currentQuestion: question })),
  on(AppActions.setStatistics, (state, { statistics }) => ({
    ...state,
    questionTestStatistics: {
      ...state.questionTestStatistics,
      ...statistics
    }
  })),
  on(AppActions.toggleRepeat, (state) => ({
    ...state,
    repeatWrongQuestions: !state.repeatWrongQuestions
  }))
);
