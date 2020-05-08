import { Component } from '@angular/core';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { Book } from 'src/app/types/book';
import { Observable } from 'rxjs';
import { selectNrOfBooks, selectBooksOrderedByTitle } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

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
    this.books$ = this.store.pipe(select(selectBooksOrderedByTitle));
    this.nrOfBooks$ = this.store.pipe(select(selectNrOfBooks));
  }
}
