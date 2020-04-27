import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Book } from 'src/app/types/Book';
import { selectBooks } from 'src/app/store/selectors/library.selectors';
import { AddBook } from 'src/app/store/actions/books.actions';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  books: Array<Book>;
  books$: Observable<Array<Book>>;
  invalidTitle$ = new BehaviorSubject<boolean>(false);

  constructor(
    private logger: LoggerService,
    private store: Store<IAppState>,
  ) {
    this.books$ = this.store.pipe(select(selectBooks));
    this.books$.subscribe(books => {
      this.books = books;
      this.logger.log(books);
    });
  }

  ngOnInit(): void {
  }

  onTitleChanged(title: string): void {
    if (!!title) {
      const titleExists = this.bookTitleExists(title);
      this.invalidTitle$.next(titleExists);
    }
  }

  bookTitleExists(title: string): boolean {
    return this.books
      .filter(book => !!book)
      .find(book => book.title.toLowerCase() === title.toLowerCase()) != null;
  }

  add(title: string) {
    if (this.bookTitleExists(title)) {
      return;
    }

    const book: Book = {
      title
    };
    this.store.dispatch(new AddBook(book));
  }
}
