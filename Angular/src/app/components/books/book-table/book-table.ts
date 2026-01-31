import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectBooks, selectBooksSortedByTitle } from '../../../state/app.selectors';
import { BookRecord } from '../book-record/book-record';

@Component({
  selector: 'app-book-table',
  imports: [CommonModule, BookRecord],
  templateUrl: './book-table.html',
  styleUrl: './book-table.css',
})
export class BookTable {
  readonly booksSorted$!: Observable<ReturnType<typeof selectBooksSortedByTitle>>;
  readonly hasBooks$!: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.booksSorted$ = this.store.select(selectBooksSortedByTitle);
    this.hasBooks$ = this.store.select(selectBooks).pipe(map((books) => books.length > 0));
  }
}
