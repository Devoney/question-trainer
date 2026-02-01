import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, TranslocoModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  @Input() errMessage = '';
  @Output() add = new EventEmitter<string>();
  @Output() titleChanged = new EventEmitter<{ old: string; new: string }>();

  buttonText = 'Add';
  bookTitle = '';
  errorMessage = '';
  private previousTitle = '';

  get invalidTitle(): boolean {
    if (_.isEmpty(this.bookTitle)) {
      return true;
    }
    return !_.isEmpty(this.errMessage);
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

  ok(): void {
    if (this.invalidTitle) {
      return;
    }
    const bookTitle = this.bookTitle;
    if (_.isEmpty(bookTitle)) {
      return;
    }
    this.add.emit(bookTitle);
    this.bookTitle = '';
    this.previousTitle = '';
  }

  cancel(): void {
    this.bookTitle = '';
    this.previousTitle = '';
  }

  onTitleChanged(newTitle: string): void {
    this.titleChanged.emit({ old: this.previousTitle, new: newTitle });
    this.previousTitle = newTitle;
  }

  ngOnChanges(): void {
    this.errorMessage = this.errMessage;
  }
}
