import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/book';
import { Observable } from 'rxjs';
import { selectBooks, selectSelectedBookId } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { LoggerService } from 'src/app/services/logger.service';
import { Event } from '@angular/router';
import { SetSelectedBookId } from 'src/app/store/actions/books.actions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-select',
  templateUrl: './book-select.component.html',
  styleUrls: ['./book-select.component.css']
})
export class BookSelectComponent {

  books$: Observable<Array<Book>>;
  hasBookSelected$: Observable<boolean>;
  selectBookFormGroup: FormGroup;
  lastSelectedBookId: string;
  bookIdSelectedFromStore: string;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
  ) {
    this.selectBookFormGroup = this.formBuilder.group({
      bookIdSelected: null
    });

    this.selectBookFormGroup.valueChanges.subscribe(formValues => {
      this.bookSelectionChanged(formValues.bookIdSelected);
    });

    this.books$ = this.store.pipe( // TODO: Refactor, this sorting is done more often.
      select(selectBooks),
      map(books => {
        return _.sortBy(books, (b) => b.title);
      })
    );

    this.hasBookSelected$ = this.store.pipe(
      select(selectSelectedBookId), 
      map((selectedBookId) => {
        return !!selectedBookId;
      })
    );

    this.store.pipe(select(selectSelectedBookId)).subscribe(selectedBookId => {
      this.bookIdSelectedFromStore = selectedBookId;
      this.selectBookFormGroup.patchValue({
        bookIdSelected: selectedBookId
      });
    });
  }

  bookSelectionChanged(bookId: string): void {
    if (!bookId || this.lastSelectedBookId === bookId || this.bookIdSelectedFromStore === bookId) {
      return;
    }

    this.lastSelectedBookId = bookId;
    const action = new SetSelectedBookId(bookId);
    this.store.dispatch(action);
    this.logger.log('bookIdSelected: ', bookId);
  }
}
