import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/book';
import { selectBooks, selectBookIdToEdit } from 'src/app/store/selectors/library.selectors';
import { AddBook } from 'src/app/store/actions/books.actions';
import { Guid } from 'src/tools/Guid';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  bookIdToEdit$: Observable<string>;

  constructor(
    private logger: LoggerService,
    private store: Store<IAppState>,
  ) {
    this.bookIdToEdit$ = this.store.select(selectBookIdToEdit);
  }

  ngOnInit(): void {
  }
}
