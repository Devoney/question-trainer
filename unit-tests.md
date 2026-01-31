# Unit Test Plan (Angular)

## Bootstrapping
- [ ] Angular/src/main.ts
  - [ ] Bootstraps App with app config

## App shell
- [ ] Angular/src/app/app.ts
  - [ ] `viewMode$` drives `showLibrary$` and `showQuestions$`
  - [ ] Registers Font Awesome icons
- [ ] Angular/src/app/app.config.ts
  - [ ] Providers and runtime configuration are registered
- [ ] Angular/src/app/app.routes.ts
  - [ ] Route configuration matches expected paths
- [ ] Angular/src/app/font-awesome.ts
  - [ ] Icon registrations include expected icons

## Services
- [ ] Angular/src/app/services/message-bus.service.ts
  - [ ] Emits and subscribes to modal events correctly

## State
- [ ] Angular/src/app/state/app-state.ts
  - [ ] Default/initial state matches expected shape
- [ ] Angular/src/app/state/app.actions.ts
  - [ ] Action creators generate correct type and payload
- [ ] Angular/src/app/state/app.reducer.ts
  - [ ] Reducer updates state for key actions
- [ ] Angular/src/app/state/app.selectors.ts
  - [ ] Selectors return correct slices and derived data
- [ ] Angular/src/app/state/app.effects.ts
  - [ ] Effects react to actions and dispatch expected results
- [ ] Angular/src/app/state/index.ts
  - [ ] Re-exports are stable and correct

## Models
- [ ] Angular/src/app/models/book.ts
  - [ ] Constructor assigns properties
  - [ ] Static helpers (e.g., question aggregation) behave correctly
- [ ] Angular/src/app/models/chapter.ts
  - [ ] Constructor assigns properties
  - [ ] Question collection behavior is correct
- [ ] Angular/src/app/models/question.ts
  - [ ] Constructor assigns properties

## Utils
- [ ] Angular/src/app/utils/date-string.ts
  - [ ] Formats dates consistently
  - [ ] Handles edge cases (single-digit month/day)
- [ ] Angular/src/app/utils/math.ts
  - [ ] `getRandomInt` stays within bounds
- [ ] Angular/src/app/utils/text-transformers.ts
  - [ ] Truncation with dots behaves as expected
  - [ ] Empty/short strings return unchanged

## Types
- [ ] Angular/src/app/types/html-input-event.ts
  - [ ] Type guards or typings cover expected input usage
- [ ] Angular/src/app/types/index.ts
  - [ ] Re-exports are stable and correct
- [ ] Angular/src/app/types/question-modal-args.ts
  - [ ] Constructor assigns all fields correctly
- [ ] Angular/src/app/types/question-test-statistics.ts
  - [ ] Default statistics values are correct
- [ ] Angular/src/app/types/tab.ts
  - [ ] Tab definition shape is correct

## Components
- [ ] Angular/src/app/components/add-or-remove/add-or-remove.ts
  - [ ] Emits add/remove events based on user action
- [ ] Angular/src/app/components/books/add-book/add-book.ts
  - [ ] Validates input and dispatches add action
- [ ] Angular/src/app/components/books/book-manager/book-manager.ts
  - [ ] Subscribes to book lists and edit state
  - [ ] Dispatches add action with valid title
- [ ] Angular/src/app/components/books/book-record/book-record.ts
  - [ ] Toggles edit state based on selection
  - [ ] Dispatches add/remove question list actions
- [ ] Angular/src/app/components/books/book-selector/book-selector.ts
  - [ ] Updates selection and dispatches set-selected book
- [ ] Angular/src/app/components/books/book-table/book-table.ts
  - [ ] Renders sorted list and empty-state
- [ ] Angular/src/app/components/books/edit-book/edit-book.ts
  - [ ] Validates title and dispatches edit action
  - [ ] Cancels edit and restores state
- [ ] Angular/src/app/components/chapters/add-chapter/add-chapter.ts
  - [ ] Validates chapter input and dispatches add action
- [ ] Angular/src/app/components/chapters/chapter-manager/chapter-manager.ts
  - [ ] Derives add/edit mode from state
- [ ] Angular/src/app/components/chapters/chapter-record/chapter-record.ts
  - [ ] Toggles edit state and dispatches remove action
- [ ] Angular/src/app/components/chapters/chapter-selector/chapter-selector.ts
  - [ ] Updates selection and dispatches set-selected chapter
- [ ] Angular/src/app/components/chapters/chapter-table/chapter-table.ts
  - [ ] Renders chapter list and empty-state
- [ ] Angular/src/app/components/chapters/edit-chapter/edit-chapter.ts
  - [ ] Validates edits and dispatches edit action
- [ ] Angular/src/app/components/confirmation-modal/confirmation-modal.ts
  - [ ] Emits confirm/cancel events
- [ ] Angular/src/app/components/icon-button/icon-button.ts
  - [ ] Renders icon and forwards click events
- [ ] Angular/src/app/components/import-export/import-export.ts
  - [ ] Builds export data and triggers download
  - [ ] Loads import JSON and updates local storage
- [ ] Angular/src/app/components/library/library.ts
  - [ ] Switches between library views and state
- [ ] Angular/src/app/components/library/library-details/library-details.ts
  - [ ] Loads and updates library name
- [ ] Angular/src/app/components/library/memory-usage/memory-usage.ts
  - [ ] Displays memory usage based on inputs
- [ ] Angular/src/app/components/question-list/clear-button/clear-button.ts
  - [ ] Shows disabled state when list empty
  - [ ] Dispatches clear action
- [ ] Angular/src/app/components/question-list/question-list/question-list.ts
  - [ ] Renders list and empty-state
- [ ] Angular/src/app/components/question-list/question-list-record/question-list-record.ts
  - [ ] Truncates text and dispatches remove action
- [ ] Angular/src/app/components/question-list/question-trainer/question-trainer.ts
  - [ ] Starts/advances questions and updates statistics
  - [ ] Toggles repeat behavior
- [ ] Angular/src/app/components/question-modal/question-modal.ts
  - [ ] Opens with args and invokes handlers
- [ ] Angular/src/app/components/questions/add-question/add-question.ts
  - [ ] Validates input and dispatches add/edit action
- [ ] Angular/src/app/components/questions/question-manager/question-manager.ts
  - [ ] Shows/hides question table based on chapter selection
- [ ] Angular/src/app/components/questions/question-record/question-record.ts
  - [ ] Toggles edit state and dispatches list actions
- [ ] Angular/src/app/components/questions/question-table/question-table.ts
  - [ ] Renders question list and empty-state
- [ ] Angular/src/app/components/tab-page/tab-page.ts
  - [ ] Shows tab content for active tab
- [ ] Angular/src/app/components/tabs/tabs.ts
  - [ ] Renders tabs and emits tab change
- [ ] Angular/src/app/components/view-mode/view-mode.ts
  - [ ] Toggles menu and dispatches view mode change
- [ ] Angular/src/app/components/view-mode-item/view-mode-item.ts
  - [ ] Emits view mode selection
