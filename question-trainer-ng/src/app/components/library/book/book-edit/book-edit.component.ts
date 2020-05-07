import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { selectBooks, selectBookToEdit } from 'src/app/store/selectors/library.selectors';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Book } from 'src/app/types/book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'src/tools/Guid';
import { IAppState } from 'src/app/store/state/app.state';
import { LoggerService } from 'src/app/services/logger.service';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SetBookIdToEdit, UpdateBook } from 'src/app/store/actions/books.actions';
import { clone } from 'src/tools/ObjectExt';
import { i18n } from 'src/app/enums/i18n';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnChanges {

  bookTitle$ = new BehaviorSubject<string>(null);
  invalidTitle$ = new BehaviorSubject<boolean>(false);
  bookTitleIsEmpty$: Observable<boolean>;
  bookTitleExists$: Observable<boolean>;
  bookTitleIsInvalidOrEmpty$: Observable<boolean>;
  books: Array<Book>;
  books$: Observable<Array<Book>>;
  errorMessage$: Observable<string>;
  editBookForm: FormGroup;
  book: Book;

  get bookTitle(): string {
    return this.editBookForm.value.bookTitle;
  }

  set bookTitle(value: string) {
    this.editBookForm.setValue({ bookTitle: value });
  }

  constructor(
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private store: Store<IAppState>,
    private i18nService: I18nService,
  ) {
    this.editBookForm = this.formBuilder.group({
      bookTitle: ''
    });

    this.editBookForm.valueChanges.subscribe(formValues => {
      this.bookTitle$.next(formValues.bookTitle);
    });

    this.bookTitleIsEmpty$ = this.editBookForm.valueChanges.pipe(
      map(formValues => {
        return !formValues.bookTitle;
      })
    );

    this.bookTitleIsInvalidOrEmpty$ = combineLatest([
      this.invalidTitle$,
      this.bookTitleIsEmpty$,
    ]).pipe(
      map(([invalidTitle, bookTitleIsEmpty]) => {
          return invalidTitle || bookTitleIsEmpty;
      })
    );

    this.books$ = this.store.pipe(select(selectBooks));
    this.books$.subscribe(books => {
      this.books = books;
      this.logger.log(books);
    });

    this.store.pipe(select(selectBookToEdit)).subscribe(book => {
      if (!!book) {
        this.book = clone(book);
        this.editBookForm.setValue({ bookTitle: book.title});
      }
    });

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
          .filter(book => !!book && book.id !== this.book.id)
          .find(book => book.title.toLowerCase() === bookTitle.toLowerCase());

        return !!bookWithSameTitle;
      })
    );

    this.errorMessage$ = combineLatest([
      this.bookTitleIsEmpty$,
      this.bookTitleExists$,
    ]).pipe(
      map(([bookTitleIsEmpty, bookTitleExists]) => {
        let toTranslate: i18n;
        if (bookTitleIsEmpty) {
          toTranslate = i18n.TitleIsRequired;
        } else if (bookTitleExists) {
          toTranslate = i18n.TitleAlreadyInUse;
        }

        if (!toTranslate) {
          return '';
        }

        return this.i18nService.getTranslation(toTranslate);
      })
    );
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
      this.edit(bookTitle);
      this.clear();
    }
  }

  cancel(): void {
    this.store.dispatch(new SetBookIdToEdit(null));
  }

  clear(): void {
    this.editBookForm.reset();
    this.store.dispatch(new SetBookIdToEdit(null));
    this.book = null;
  }

  onTitleChanged(): void {
    const title = this.editBookForm.value.bookTitle;
    if (!!title) {
      const titleExists = this.bookTitleExists(title);
      this.invalidTitle$.next(titleExists);
    }
  }

  bookTitleExists(title: string): boolean {
    return this.books
      .filter(book => !!book && book.id !== this.book.id)
      .find(book => book.title.toLowerCase() === title.toLowerCase()) != null;
  }

  edit(title: string) {
    if (this.bookTitleExists(title)) {
      return;
    }
    this.book.title = this.bookTitle;
    const updateBook = new UpdateBook(this.book);
    this.store.dispatch(updateBook);
  }
}
