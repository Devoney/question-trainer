# Unit Test Plan (Angular)

## Bootstrapping
- [x] Angular/src/main.ts
  - [x] Bootstraps App with app config

## App shell
- [x] Angular/src/app/app.ts
  - [x] `viewMode$` drives `showLibrary$` and `showQuestions$`
  - [x] Registers Font Awesome icons
- [x] Angular/src/app/app.config.ts
  - [x] Providers and runtime configuration are registered
- [x] Angular/src/app/app.routes.ts
  - [x] Route configuration matches expected paths
- [x] Angular/src/app/font-awesome.ts
  - [x] Icon registrations include expected icons

## Services
- [x] Angular/src/app/services/answer-checker.service.ts
  - [x] Sends Ollama request and parses AI response
- [x] Angular/src/app/services/message-bus.service.ts
  - [x] Emits and subscribes to modal events correctly

## State
- [x] Angular/src/app/state/app-state.ts
  - [x] Default/initial state matches expected shape
- [x] Angular/src/app/state/app.actions.ts
  - [x] Action creators generate correct type and payload
- [x] Angular/src/app/state/app.reducer.ts
  - [x] Reducer updates state for key actions
- [x] Angular/src/app/state/app.selectors.ts
  - [x] Selectors return correct slices and derived data
- [x] Angular/src/app/state/app.effects.ts
  - [x] Effects react to actions and dispatch expected results
- [x] Angular/src/app/state/index.ts
  - [x] Re-exports are stable and correct

## Models
- [x] Angular/src/app/models/book.ts
  - [x] Constructor assigns properties
  - [x] Static helpers (e.g., question aggregation) behave correctly
- [x] Angular/src/app/models/chapter.ts
  - [x] Constructor assigns properties
  - [x] Question collection behavior is correct
- [x] Angular/src/app/models/question.ts
  - [x] Constructor assigns properties

## Utils
- [x] Angular/src/app/utils/date-string.ts
  - [x] Formats dates consistently
  - [x] Handles edge cases (single-digit month/day)
- [x] Angular/src/app/utils/math.ts
  - [x] `getRandomInt` stays within bounds
- [x] Angular/src/app/utils/text-transformers.ts
  - [x] Truncation with dots behaves as expected
  - [x] Empty/short strings return unchanged

## Types
- [x] Angular/src/app/types/html-input-event.ts
  - [x] Type guards or typings cover expected input usage
- [x] Angular/src/app/types/index.ts
  - [x] Re-exports are stable and correct
- [x] Angular/src/app/types/question-modal-args.ts
  - [x] Constructor assigns all fields correctly
- [x] Angular/src/app/types/question-test-statistics.ts
  - [x] Default statistics values are correct
- [x] Angular/src/app/types/tab.ts
  - [x] Tab definition shape is correct

## Components
- [x] Angular/src/app/components/add-or-remove/add-or-remove.ts
  - [x] Emits add/remove events based on user action
- [x] Angular/src/app/components/books/add-book/add-book.ts
  - [x] Validates input and dispatches add action
- [x] Angular/src/app/components/books/book-manager/book-manager.ts
  - [x] Subscribes to book lists and edit state
  - [x] Dispatches add action with valid title
- [x] Angular/src/app/components/books/book-record/book-record.ts
  - [x] Toggles edit state based on selection
  - [x] Dispatches add/remove question list actions
- [x] Angular/src/app/components/books/book-selector/book-selector.ts
  - [x] Updates selection and dispatches set-selected book
- [x] Angular/src/app/components/books/book-table/book-table.ts
  - [x] Renders sorted list and empty-state
- [x] Angular/src/app/components/books/edit-book/edit-book.ts
  - [x] Validates title and dispatches edit action
  - [x] Cancels edit and restores state
- [x] Angular/src/app/components/chapters/add-chapter/add-chapter.ts
  - [x] Validates chapter input and dispatches add action
- [x] Angular/src/app/components/chapters/chapter-manager/chapter-manager.ts
  - [x] Derives add/edit mode from state
- [x] Angular/src/app/components/chapters/chapter-record/chapter-record.ts
  - [x] Toggles edit state and dispatches remove action
- [x] Angular/src/app/components/chapters/chapter-selector/chapter-selector.ts
  - [x] Updates selection and dispatches set-selected chapter
- [x] Angular/src/app/components/chapters/chapter-table/chapter-table.ts
  - [x] Renders chapter list and empty-state
- [x] Angular/src/app/components/chapters/edit-chapter/edit-chapter.ts
  - [x] Validates edits and dispatches edit action
- [x] Angular/src/app/components/confirmation-modal/confirmation-modal.ts
  - [x] Emits confirm/cancel events
- [x] Angular/src/app/components/icon-button/icon-button.ts
  - [x] Renders icon and forwards click events
- [x] Angular/src/app/components/import-export/import-export.ts
  - [x] Builds export data and triggers download
  - [x] Loads import JSON and updates local storage
- [x] Angular/src/app/components/library/library.ts
  - [x] Switches between library views and state
- [x] Angular/src/app/components/library/library-details/library-details.ts
  - [x] Loads and updates library name
- [x] Angular/src/app/components/library/memory-usage/memory-usage.ts
  - [x] Displays memory usage based on inputs
- [x] Angular/src/app/components/question-list/clear-button/clear-button.ts
  - [x] Shows disabled state when list empty
  - [x] Dispatches clear action
- [x] Angular/src/app/components/question-list/question-list/question-list.ts
  - [x] Renders list and empty-state
- [x] Angular/src/app/components/question-list/question-list-record/question-list-record.ts
  - [x] Truncates text and dispatches remove action
- [x] Angular/src/app/components/question-list/question-trainer/question-trainer.ts
  - [x] Starts/advances questions and updates statistics
  - [x] Toggles repeat behavior
- [x] Angular/src/app/components/question-modal/question-modal.ts
  - [x] Opens with args and invokes handlers
- [x] Angular/src/app/components/questions/add-question/add-question.ts
  - [x] Validates input and dispatches add/edit action
- [x] Angular/src/app/components/questions/question-manager/question-manager.ts
  - [x] Shows/hides question table based on chapter selection
- [x] Angular/src/app/components/questions/question-record/question-record.ts
  - [x] Toggles edit state and dispatches list actions
- [x] Angular/src/app/components/questions/question-table/question-table.ts
  - [x] Renders question list and empty-state
- [x] Angular/src/app/components/tab-page/tab-page.ts
  - [x] Shows tab content for active tab
- [x] Angular/src/app/components/tabs/tabs.ts
  - [x] Renders tabs and emits tab change
- [x] Angular/src/app/components/view-mode/view-mode.ts
  - [x] Toggles menu and dispatches view mode change
- [x] Angular/src/app/components/view-mode-item/view-mode-item.ts
  - [x] Emits view mode selection
