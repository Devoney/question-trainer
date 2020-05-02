import { Component, OnInit, ViewChild } from '@angular/core';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { Book } from 'src/app/types/Book';
import { Observable } from 'rxjs';
import { selectBooks, selectNrOfBooks } from 'src/app/store/selectors/library.selectors';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.css']
})
export class BooksOverviewComponent {

  books$: Observable<Book[]>;
  nrOfBooks$: Observable<number>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.books$ = this.store.pipe(select(selectBooks));
    this.nrOfBooks$ = this.store.pipe(select(selectNrOfBooks));
  }
}
