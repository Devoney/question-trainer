import { AddBook } from 'src/app/store/actions/books.actions';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Book } from 'src/app/types/book';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'src/tools/Guid';
import { IAppState } from 'src/app/store/state/app.state';
import { LoggerService } from 'src/app/services/logger.service';
import { map } from 'rxjs/operators';
import { selectBooks } from 'src/app/store/selectors/library.selectors';
import { Store, select } from '@ngrx/store';
import { I18nService } from 'src/app/services/i18n.service';
import { i18n } from 'src/app/enums/i18n';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  books$: Observable<Array<Book>>;
  bookTitle$ = new BehaviorSubject<string>(null);
  bookTitleExists$: Observable<boolean>;
  bookTitleIsEmpty$: Observable<boolean>;
  bookTitleIsInvalidAndNotEmpty$: Observable<boolean>;
  errorMessage$: Observable<string>;
  invalidTitle$ = new BehaviorSubject<boolean>(false);

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
    private i18nService: I18nService,
  ) {
    this.addBookForm = this.formBuilder.group({
      bookTitle: ''
    });

    this.addBookForm.valueChanges.subscribe(formValues => {
      this.bookTitle$.next(formValues.bookTitle);
    });

    this.bookTitleIsEmpty$ = this.bookTitle$.pipe(
      map(bookTitle => {
        return !bookTitle;
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

    this.bookTitleExists$ = combineLatest([
      this.bookTitle$,
      this.books$
    ]).pipe(
      map(([bookTitle, books]) => {
        if (!bookTitle) {
          return false;
        }

        if (!books || books.length === 0) {
          return false;
        }

        const bookWithSameTitle = books
          .filter(book => !!book)
          .find(book => book.title.toLowerCase() === bookTitle.toLowerCase());

        return !!bookWithSameTitle;
      })
    );

    this.errorMessage$ = combineLatest([
      this.bookTitleExists$,
    ]).pipe(
      map(([bookTitleExists]) => {
        if (bookTitleExists) {
          return this.i18nService.getTranslation(i18n.TitleAlreadyInUse);
        }
        return '';
      })
    );

    combineLatest([
      this.bookTitleExists$
    ]).pipe(
      map(([bookTitleExists]) => {
        return bookTitleExists;
      })
    ).subscribe((bookTitleExists) => {
      this.invalidTitle$.next(bookTitleExists);
    });
  }

  ngOnInit(): void {
  }

  ok(): void {
    const bookTitle = this.bookTitle$.getValue();
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

  add(title: string) {
    const book: Book = {
      id: Guid.newGuid(),
      title
    };
    this.store.dispatch(new AddBook(book));
  }
}
