# Vue-to-Angular Conversion Plan (with NgRX)

> Checklist-style plan. Update this file after each completed step.

## 0) Repository orientation
- [x] Review Vue app structure and feature set
- [x] Identify CSS framework and key dependencies
- [x] Document shared models and core state shape

## 1) Angular workspace setup (CLI)
- [x] Initialize Angular app in Angular/ (TypeScript, routing enabled)
- [x] Configure Angular project to use Bootstrap 4.3.1 (same as Vue)
- [x] Add Font Awesome setup equivalent to Vue usage
- [x] Add third‑party libs: CKEditor 5, uuid, lodash, jquery-modal (if still needed)
- [x] Verify base app builds

## 2) Core architecture
- [x] Define Angular app routing and layout shell
- [x] Add shared types/models (Book, Chapter, Question, etc.)
- [x] Add utilities (DateString, Math, TextTransformers)
- [x] Add shared components (IconButton, Tabs, TabPage, ViewMode, ViewModeItem)

## 3) NgRX state
- [x] Define global state interfaces
- [x] Create actions for library/books/chapters/questions
- [x] Create reducers and initial state
- [x] Create selectors
- [x] Add effects if async or side-effects exist
- [x] Wire StoreModule + EffectsModule into app

## 4) Feature: Library
- [x] Library shell component
- [x] LibraryDetails component
- [x] MemoryUsage component
- [x] Import/Export component

## 5) Feature: Books
- [x] BookManager component
- [x] BookTable component
- [x] BookRecord component
- [x] BookSelector component
- [x] AddBook component
- [x] EditBook component

## 6) Feature: Chapters
- [x] ChapterManager component
- [x] ChapterTable component
- [x] ChapterRecord component
- [x] ChapterSelector component
- [x] AddChapter component
- [x] EditChapter component

## 7) Feature: Questions
- [x] QuestionManager component
- [x] QuestionTable component
- [x] QuestionRecord component
- [x] AddQuestion component

## 8) Feature: Question List / Trainer
- [x] QuestionList component
- [x] QuestionListRecord component
- [x] ClearButton component
- [x] QuestionTrainer component

## 9) Modals and dialogs
- [x] ConfirmationModal component
- [x] QuestionModal component

## 10) App wiring and cleanup
- [x] Replace Vue message bus with Angular service
- [ ] Verify all views render and state updates work
- [ ] Remove Vue-specific logic from Angular build

## 11) Build verification
- [x] Build after each feature area and fix compile errors
- [x] Final production build succeeds
