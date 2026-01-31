import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { AppState } from '../../../state/app-state';
import { Book } from '../../../models/book';
import { addBook } from '../../../state/app.actions';
import { selectBookEdited, selectBooks } from '../../../state/app.selectors';
import { AddBook } from '../add-book/add-book';
import { EditBook } from '../edit-book/edit-book';
import { BookTable } from '../book-table/book-table';

@Component({
  selector: 'app-book-manager',
  imports: [CommonModule, AddBook, EditBook, BookTable],
  templateUrl: './book-manager.html',
  styleUrl: './book-manager.css'
})
export class BookManager implements OnInit, OnDestroy {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  titleIsNotValidMessage = '';
  bookEdited?: Book;
  books: Book[] = [];

  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.store
      .select(selectBooks)
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => (this.books = books));
    this.store
      .select(selectBookEdited)
      .pipe(takeUntil(this.destroy$))
      .subscribe((book) => (this.bookEdited = book));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  add(title: string): void {
    if (_.isEmpty(_.trim(title))) {
      return;
    }
    if (this.titleAlreadyInCollection(title)) {
      return;
    }
    const id = uuid();
    const book = new Book(id, title);
    this.store.dispatch(addBook({ book }));
  }

  titleChanged(title: { new: string; old: string }): void {
    if (!title.new) {
      this.titleIsNotValidMessage = '';
      return;
    }

    const titleLowerCase = title.new.toLowerCase();
    const titleExists =
      _.findIndex(this.books, (b) => b.title.toLowerCase() === titleLowerCase) !== -1;

    this.titleIsNotValidMessage = titleExists ? 'Title already exists.' : '';
  }

  private titleAlreadyInCollection(title: string): boolean {
    const lowerCaseTitle = title.toLowerCase();
    return (
      _.findIndex(this.books, (b) => b.title.toLowerCase() === lowerCaseTitle) !== -1
    );
  }
}
