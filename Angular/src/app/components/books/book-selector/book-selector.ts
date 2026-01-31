import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../state/app-state';
import { Book } from '../../../models/book';
import { selectBookSelected, selectBooksSortedByTitle } from '../../../state/app.selectors';
import { setSelectedBook } from '../../../state/app.actions';

@Component({
  selector: 'app-book-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-selector.html',
  styleUrl: './book-selector.css',
})
export class BookSelector implements OnInit, OnDestroy {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  books: Book[] = [];
  selectedBookId = '';

  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.store
      .select(selectBooksSortedByTitle)
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => (this.books = books));
    this.store
      .select(selectBookSelected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((book) => {
        this.selectedBookId = book?.id ?? '';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBookSelected(bookId: string): void {
    const book = this.books.find((b) => b.id === bookId);
    this.store.dispatch(setSelectedBook({ book }));
  }
}
