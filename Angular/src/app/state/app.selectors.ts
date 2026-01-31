import { createFeatureSelector, createSelector } from '@ngrx/store';
import _ from 'lodash';
import { AppState } from './app-state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectBooks = createSelector(selectAppState, (state) => state.books);
export const selectBookSelected = createSelector(selectAppState, (state) => state.bookSelected);
export const selectBookEdited = createSelector(selectAppState, (state) => state.bookEdited);
export const selectChapterSelected = createSelector(selectAppState, (state) => state.chapterSelected);
export const selectChapterEdited = createSelector(selectAppState, (state) => state.chapterEdited);
export const selectLibraryName = createSelector(selectAppState, (state) => state.libraryName);
export const selectQuestionEdited = createSelector(selectAppState, (state) => state.questionEdited);
export const selectQuestionList = createSelector(selectAppState, (state) => state.questionList);
export const selectCurrentQuestion = createSelector(selectAppState, (state) => state.currentQuestion);
export const selectQuestionStatistics = createSelector(
  selectAppState,
  (state) => state.questionTestStatistics
);
export const selectRepeatWrongQuestions = createSelector(
  selectAppState,
  (state) => state.repeatWrongQuestions
);
export const selectViewMode = createSelector(selectAppState, (state) => state.viewMode);
export const selectVersion = createSelector(selectAppState, (state) => state.version);

export const selectBooksSortedByTitle = createSelector(selectBooks, (books) =>
  _.orderBy(books, (book) => book.title.toLowerCase())
);

export const selectChaptersSortedByTitle = createSelector(
  selectBookSelected,
  (book) => {
    if (!book) {
      return [];
    }
    return _.orderBy(book.chapters, (chapter) => chapter.nr.toLowerCase());
  }
);
