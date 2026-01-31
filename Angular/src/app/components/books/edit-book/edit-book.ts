import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import _ from 'lodash';
import { AppState } from '../../../state/app-state';
import { Book } from '../../../models/book';
import { editBookTitle, setEditedBook } from '../../../state/app.actions';
import { selectBookEdited, selectBooks } from '../../../state/app.selectors';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('bookTitleText') bookTitleText?: ElementRef<HTMLInputElement>;

  buttonText = 'Save';
  bookTitle = '';
  errorMessage = '';
  private originalBookTitle = '';
  private books: Book[] = [];
  private editedBook?: Book;



  ngOnInit(): void {
    this.store
      .select(selectBooks)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((books) => (this.books = books));
    this.store
      .select(selectBookEdited)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((book) => {
        this.editedBook = book;
        if (book) {
          this.handleEdit(book);
          this.setFocus();
        }
      });
  }

  get invalidTitle(): boolean {
    if (_.isEmpty(this.bookTitle)) {
      return true;
    }
    return (
      _.findIndex(this.books, (book) => {
        if (this.editedBook && book.id === this.editedBook.id) {
          return false;
        }
        return book.title.toLowerCase() === this.bookTitle.toLowerCase();
      }) !== -1
    );
  }

  get canSave(): boolean {
    return !this.invalidTitle && !_.isEmpty(this.bookTitle.trim());
  }

  get bookTitleIsEmpty(): boolean {
    return _.isEmpty(this.bookTitle);
  }

  get errorMessageToShow(): string {
    if (_.isEmpty(this.bookTitle)) {
      return '';
    }
    return this.errorMessage;
  }

  cancel(): void {
    this.store.dispatch(setEditedBook({ book: undefined }));
  }

  ok(): void {
    if (!this.canSave) {
      return;
    }
    this.store.dispatch(editBookTitle({ title: this.bookTitle }));
    this.cancel();
  }

  onTitleChanged(): void {
    if (this.invalidTitle) {
      this.errorMessage = 'Title already exists.';
    } else {
      this.errorMessage = '';
    }
  }

  private handleEdit(book: Book): void {
    this.bookTitle = book.title;
    this.originalBookTitle = this.bookTitle;
  }

  private setFocus(): void {
    setTimeout(() => {
      this.bookTitleText?.nativeElement.focus();
    }, 0);
  }
}
