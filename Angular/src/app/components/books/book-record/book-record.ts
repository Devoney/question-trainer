import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import _ from 'lodash';
import { Book } from '../../../models/book';
import { AppState } from '../../../state/app-state';
import { addToQuestionList, removeBookById, removeFromQuestionList, setEditedBook } from '../../../state/app.actions';
import { selectBookEdited } from '../../../state/app.selectors';
import { AddOrRemove } from '../../add-or-remove/add-or-remove';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { MessageBusService } from '../../../services/message-bus.service';
import { QuestionModalArgs } from '../../../types/question-modal-args';

@Component({
  selector: 'tr[app-book-record]',
  imports: [CommonModule, AddOrRemove, IconButtonComponent],
  templateUrl: './book-record.html',
  styleUrl: './book-record.css',
})
export class BookRecord implements OnInit, OnDestroy {
  @Input({ required: true }) book!: Book;
  @Input({ required: true }) index!: number;

  bookInEditMode = false;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<{ app: AppState }>,
    private bus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectBookEdited)
      .pipe(takeUntil(this.destroy$))
      .subscribe((edited) => {
        this.bookInEditMode = !!edited && edited.id === this.book.id;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get nrOfQuestions(): number {
    if (this.nrOfChapters === 0) {
      return 0;
    }
    return Book.questions(this.book).length;
  }

  get nrOfChapters(): number {
    if (!this.book.chapters) {
      return 0;
    }
    return this.book.chapters.length;
  }

  addQuestionsToList(): void {
    _.forEach(Book.questions(this.book), (q) => {
      this.store.dispatch(addToQuestionList({ question: q }));
    });
  }

  removeQuestionsFromList(): void {
    _.forEach(Book.questions(this.book), (q) => {
      this.store.dispatch(removeFromQuestionList({ question: q }));
    });
  }

  edit(book: Book): void {
    this.store.dispatch(setEditedBook({ book }));
  }

  trash(book: Book): void {
    const args = new QuestionModalArgs(
      'Delete book',
      'Are you sure you want to delete this book?',
      () => this.trashConfirmed(),
      'Yes',
      'No'
    );
    this.bus.showQuestionModal(args);
  }

  private trashConfirmed(): void {
    this.removeQuestionsFromList();
    this.store.dispatch(removeBookById({ bookId: this.book.id }));
  }
}
