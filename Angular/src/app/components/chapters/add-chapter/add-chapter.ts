import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { Chapter } from '../../../models/chapter';
import { AppState } from '../../../state/app-state';
import { addChapter } from '../../../state/app.actions';
import { selectBookSelected } from '../../../state/app.selectors';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-chapter',
  imports: [CommonModule, FormsModule, TranslocoModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-chapter.html',
  styleUrl: './add-chapter.css',
})
export class AddChapter implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  buttonText = 'Add';
  chapter = { id: '', nr: '', title: '' };
  error = { nr: '', title: '' };
  chapters: Chapter[] = [];



  ngOnInit(): void {
    this.store
      .select(selectBookSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((book) => {
        this.chapters = book?.chapters ?? [];
        this.numberChanged();
        this.titleChanged();
      });
  }

  get canExecute(): boolean {
    return (
      !this.hasError &&
      !_.isEmpty(this.chapter.nr) &&
      !_.isEmpty(this.chapter.title) &&
      !this.chapterNumberExists() &&
      !this.titleExists()
    );
  }

  get hasError(): boolean {
    return !_.isEmpty(this.error.title) || !_.isEmpty(this.error.nr);
  }

  chapterNumberExists(): boolean {
    return (
      _.findIndex(
        this.chapters,
        (chapter) => chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase()
      ) !== -1
    );
  }

  titleExists(): boolean {
    return (
      _.findIndex(
        this.chapters,
        (chapter) => chapter.title.toLowerCase() === this.chapter.title.toLowerCase()
      ) !== -1
    );
  }

  resetError(): void {
    this.chapter.nr = '';
    this.chapter.title = '';
  }

  resetChapter(): void {
    this.error.nr = '';
    this.error.title = '';
  }

  resetData(): void {
    this.resetChapter();
    this.resetError();
  }

  numberChanged(): void {
    if (this.chapterNumberExists()) {
      this.error.nr = 'Chapter number already exists for this book.';
      return;
    }
    this.error.nr = '';
  }

  titleChanged(): void {
    if (this.titleExists()) {
      this.error.title = 'Title already exists for this book.';
      return;
    }
    this.error.title = '';
  }

  ok(): void {
    if (!this.canExecute) {
      return;
    }

    const id = uuid();
    const chapter = new Chapter(id, this.chapter.nr.toString(), this.chapter.title);
    this.store.dispatch(addChapter({ chapter }));

    this.chapter.title = '';
    this.chapter.nr = '';
  }

  cancel(): void {
    this.resetData();
  }
}
