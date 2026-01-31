# Refactor Candidates: modernization

The following Angular files can be modernized (e.g., replace manual `destroy$` subjects and `takeUntil` with `takeUntilDestroyed` + `DestroyRef`):

- [x] [Angular/src/app/components/books/book-manager/book-manager.ts](Angular/src/app/components/books/book-manager/book-manager.ts)
- [x] [Angular/src/app/components/books/book-record/book-record.ts](Angular/src/app/components/books/book-record/book-record.ts)
- [x] [Angular/src/app/components/books/book-selector/book-selector.ts](Angular/src/app/components/books/book-selector/book-selector.ts)
- [x] [Angular/src/app/components/books/edit-book/edit-book.ts](Angular/src/app/components/books/edit-book/edit-book.ts)
- [x] [Angular/src/app/components/chapters/add-chapter/add-chapter.ts](Angular/src/app/components/chapters/add-chapter/add-chapter.ts)
- [x] [Angular/src/app/components/chapters/chapter-record/chapter-record.ts](Angular/src/app/components/chapters/chapter-record/chapter-record.ts)
- [x] [Angular/src/app/components/chapters/chapter-selector/chapter-selector.ts](Angular/src/app/components/chapters/chapter-selector/chapter-selector.ts)
- [x] [Angular/src/app/components/chapters/edit-chapter/edit-chapter.ts](Angular/src/app/components/chapters/edit-chapter/edit-chapter.ts)
- [x] [Angular/src/app/components/question-list/question-trainer/question-trainer.ts](Angular/src/app/components/question-list/question-trainer/question-trainer.ts)
- [x] [Angular/src/app/components/questions/add-question/add-question.ts](Angular/src/app/components/questions/add-question/add-question.ts)
- [x] [Angular/src/app/components/questions/question-record/question-record.ts](Angular/src/app/components/questions/question-record/question-record.ts)

## Additional modernization ideas
- [x] Use `afterNextRender` to replace `setTimeout` focus in [Angular/src/app/components/books/edit-book/edit-book.ts](Angular/src/app/components/books/edit-book/edit-book.ts)
