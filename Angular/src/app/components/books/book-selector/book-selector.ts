import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppState } from '../../../state/app-state';
import { Book } from '../../../models/book';
import { selectBookSelected, selectBooksSortedByTitle } from '../../../state/app.selectors';
import { setSelectedBook } from '../../../state/app.actions';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-book-selector',
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './book-selector.html',
  styleUrl: './book-selector.css',
})
export class BookSelector implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  @Input() showLabel = true;
  @Input() disabled = false;
  books: Book[] = [];
  selectedBookId = '';


  ngOnInit(): void {
    this.store
      .select(selectBooksSortedByTitle)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((books) => (this.books = books));
    this.store
      .select(selectBookSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((book) => {
        this.selectedBookId = book?.id ?? '';
      });
  }

  onBookSelected(bookId: string): void {
    const book = this.books.find((b) => b.id === bookId);
    this.store.dispatch(setSelectedBook({ book }));
  }
}
