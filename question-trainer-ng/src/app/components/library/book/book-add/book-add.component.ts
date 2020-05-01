import { AddBook } from 'src/app/store/actions/books.actions';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Book } from 'src/app/types/Book';
import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'src/tools/Guid';
import { IAppState } from 'src/app/store/state/app.state';
import { LoggerService } from 'src/app/services/logger.service';
import { map } from 'rxjs/operators';
import { selectBooks } from 'src/app/store/selectors/library.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit, OnChanges {
  invalidTitle$ = new BehaviorSubject<boolean>(false);
  bookTitleIsEmpty$: Observable<boolean>;
  bookTitleIsInvalidAndNotEmpty$: Observable<boolean>;
  books: Array<Book>;
  books$: Observable<Array<Book>>;
  errorMessage$ = new BehaviorSubject<string>(null);
  buttonText = 'Add';
  addBookForm: FormGroup;

  get bookTitle(): string {
    return this.addBookForm.value.bookTitle;
  }

  set bookTitle(value: string) {
    this.addBookForm.setValue({ bookTitle: value });
  }

  constructor(
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.addBookForm = this.formBuilder.group({
      bookTitle: ''
    });

    this.bookTitleIsEmpty$ = this.addBookForm.valueChanges.pipe(
      map(formValues => {
        return !formValues.bookTitle;
      })
    );

    this.bookTitleIsInvalidAndNotEmpty$ = combineLatest([
      this.invalidTitle$,
      this.bookTitleIsEmpty$,
    ]).pipe(
      map(([invalidTitle, bookTitleIsEmpty]) => {
          return invalidTitle && !bookTitleIsEmpty;
      })
    );

    this.books$ = this.store.pipe(select(selectBooks));
    this.books$.subscribe(books => {
      this.books = books;
      this.logger.log(books);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.log('Changes: ');
    this.logger.log(changes);
  }

  ok(): void {
    const bookTitle = this.bookTitle;
    const invalidTitle = this.invalidTitle$.getValue();
    if (bookTitle && bookTitle.length > 0 && !invalidTitle) {
      this.add(bookTitle);
      this.clear();
    }
  }

  cancel(): void {
    this.clear();
  }

  clear(): void {
    this.addBookForm.reset();
  }

  onTitleChanged(): void {
    const title = this.addBookForm.value.bookTitle;
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
      id: Guid.newGuid(),
      title
    };
    this.store.dispatch(new AddBook(book));
  }
}
