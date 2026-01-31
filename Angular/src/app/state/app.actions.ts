import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { Question } from '../models/question';
import { QuestionTestStatistics } from '../types/question-test-statistics';
import { AppState } from './app-state';

export const hydrateState = createAction('[App] Hydrate State', props<{ state: AppState }>());
export const setViewMode = createAction('[App] Set View Mode', props<{ viewMode: string }>());

export const addBook = createAction('[Book] Add', props<{ book: Book }>());
export const editBookTitle = createAction('[Book] Edit Title', props<{ title: string }>());
export const removeBookById = createAction('[Book] Remove By Id', props<{ bookId: string }>());
export const setBooks = createAction('[Book] Set All', props<{ books: Book[] }>());
export const setEditedBook = createAction('[Book] Set Edited', props<{ book?: Book }>());
export const setSelectedBook = createAction('[Book] Set Selected', props<{ book?: Book }>());

export const addChapter = createAction('[Chapter] Add', props<{ chapter: Chapter }>());
export const editChapter = createAction('[Chapter] Edit', props<{ nr: string; title: string }>());
export const removeChapterById = createAction('[Chapter] Remove By Id', props<{ chapterId: string }>());
export const setEditedChapter = createAction('[Chapter] Set Edited', props<{ chapter?: Chapter }>());
export const setSelectedChapter = createAction('[Chapter] Set Selected', props<{ chapter?: Chapter }>());

export const setLibraryName = createAction('[Library] Set Name', props<{ name: string }>());

export const addQuestion = createAction('[Question] Add', props<{ question: Question }>());
export const editQuestion = createAction('[Question] Edit', props<{ question: Question }>());
export const removeQuestionById = createAction('[Question] Remove By Id', props<{ questionId: string }>());
export const setEditedQuestion = createAction('[Question] Set Edited', props<{ question?: Question }>());

export const addToQuestionList = createAction('[Question List] Add', props<{ question: Question }>());
export const removeFromQuestionList = createAction('[Question List] Remove', props<{ question: Question }>());
export const clearQuestionList = createAction('[Question List] Clear');

export const setCurrentQuestion = createAction('[Trainer] Set Current Question', props<{ question?: Question }>());
export const setStatistics = createAction('[Trainer] Set Statistics', props<{ statistics: Partial<QuestionTestStatistics> }>());
export const toggleRepeat = createAction('[Trainer] Toggle Repeat');
