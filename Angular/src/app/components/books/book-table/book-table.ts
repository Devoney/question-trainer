import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectBooks, selectBooksSortedByTitle } from '../../../state/app.selectors';
import { BookRecord } from '../book-record/book-record';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-book-table',
  imports: [CommonModule, BookRecord, TranslocoModule],
  templateUrl: './book-table.html',
  styleUrl: './book-table.css',
})
export class BookTable {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  readonly booksSorted$ = this.store.select(selectBooksSortedByTitle);
  readonly hasBooks$ = this.store.select(selectBooks).pipe(map((books) => books.length > 0));
}
