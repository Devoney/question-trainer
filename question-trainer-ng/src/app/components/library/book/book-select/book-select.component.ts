import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/book';
import { Observable } from 'rxjs';
import { selectBooks } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-book-select',
  templateUrl: './book-select.component.html',
  styleUrls: ['./book-select.component.css']
})
export class BookSelectComponent {

  books$: Observable<Array<Book>>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.books$ = this.store.pipe( // TODO: Refactor, this sorting is done more often.
      select(selectBooks),
      map(books => {
        return _.sortBy(books, (b) => b.title);
      })
    );
  }

}
