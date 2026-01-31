import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectBookSelected } from '../../../state/app.selectors';
import { Chapter } from '../../../models/chapter';
import { ChapterRecord } from '../chapter-record/chapter-record';

@Component({
  selector: 'app-chapter-table',
  imports: [CommonModule, ChapterRecord],
  templateUrl: './chapter-table.html',
  styleUrl: './chapter-table.css',
})
export class ChapterTable {
  readonly chapters$!: Observable<Chapter[]>;
  readonly hasChapters$!: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.chapters$ = this.store
      .select(selectBookSelected)
      .pipe(map((book) => book?.chapters ?? []));
    this.hasChapters$ = this.chapters$.pipe(map((chapters) => chapters.length > 0));
  }
}
