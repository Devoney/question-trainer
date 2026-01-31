import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectBookSelected, selectChapterEdited } from '../../../state/app.selectors';
import { AddChapter } from '../add-chapter/add-chapter';
import { EditChapter } from '../edit-chapter/edit-chapter';
import { BookSelector } from '../../books/book-selector/book-selector';
import { ChapterTable } from '../chapter-table/chapter-table';

@Component({
  selector: 'app-chapter-manager',
  imports: [CommonModule, AddChapter, EditChapter, BookSelector, ChapterTable],
  templateUrl: './chapter-manager.html',
  styleUrl: './chapter-manager.css',
})
export class ChapterManager {
  readonly hasBook$!: Observable<boolean>;
  readonly inAddMode$!: Observable<boolean>;
  readonly inEditMode$!: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.hasBook$ = this.store.select(selectBookSelected).pipe(map((book) => !!book));
    this.inAddMode$ = this.store.select(selectChapterEdited).pipe(map((chapter) => !chapter));
    this.inEditMode$ = this.store.select(selectChapterEdited).pipe(map((chapter) => !!chapter));
  }
}
