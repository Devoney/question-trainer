import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app-state';
import { selectBookSelected } from '../../../state/app.selectors';
import { Chapter } from '../../../models/chapter';
import { ChapterRecord } from '../chapter-record/chapter-record';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-chapter-table',
  imports: [CommonModule, ChapterRecord, TranslocoModule],
  templateUrl: './chapter-table.html',
  styleUrl: './chapter-table.css',
})
export class ChapterTable {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  readonly chapters$ = this.store
    .select(selectBookSelected)
    .pipe(map((book) => book?.chapters ?? []));
  readonly hasChapters$ = this.chapters$.pipe(map((chapters) => chapters.length > 0));
}
