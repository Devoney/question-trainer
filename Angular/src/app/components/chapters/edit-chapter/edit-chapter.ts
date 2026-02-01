import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import _ from 'lodash';
import { Chapter } from '../../../models/chapter';
import { AppState } from '../../../state/app-state';
import { editChapter, setEditedChapter } from '../../../state/app.actions';
import { selectBookSelected, selectChapterEdited } from '../../../state/app.selectors';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-chapter',
  imports: [CommonModule, FormsModule, TranslocoModule, MatButtonModule],
  templateUrl: './edit-chapter.html',
  styleUrl: './edit-chapter.css',
})
export class EditChapter implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  buttonText = 'Edit';
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

    this.store
      .select(selectChapterEdited)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chapterEdited) => {
        if (!chapterEdited) {
          return;
        }
        this.chapter.id = chapterEdited.id;
        this.chapter.nr = chapterEdited.nr;
        this.chapter.title = chapterEdited.title;
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
        (chapter) =>
          chapter.nr.toLowerCase() === this.chapter.nr.toLowerCase() &&
          chapter.id !== this.chapter.id
      ) !== -1
    );
  }

  titleExists(): boolean {
    return (
      _.findIndex(
        this.chapters,
        (chapter) =>
          chapter.title.toLowerCase() === this.chapter.title.toLowerCase() &&
          chapter.id !== this.chapter.id
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

    this.store.dispatch(editChapter({ nr: this.chapter.nr, title: this.chapter.title }));
    this.cancel();
  }

  cancel(): void {
    this.resetData();
    this.store.dispatch(setEditedChapter({ chapter: undefined }));
  }
}
