import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../state/app-state';
import { Chapter } from '../../../models/chapter';
import { selectChapterSelected, selectChaptersSortedByTitle } from '../../../state/app.selectors';
import { setSelectedChapter } from '../../../state/app.actions';

@Component({
  selector: 'app-chapter-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './chapter-selector.html',
  styleUrl: './chapter-selector.css',
})
export class ChapterSelector implements OnInit, OnDestroy {
  chapters: Chapter[] = [];
  selectedChapterId = '';

  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ app: AppState }>) {}

  ngOnInit(): void {
    this.store
      .select(selectChaptersSortedByTitle)
      .pipe(takeUntil(this.destroy$))
      .subscribe((chapters) => (this.chapters = chapters));
    this.store
      .select(selectChapterSelected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((chapter) => {
        this.selectedChapterId = chapter?.id ?? '';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChapterSelected(chapterId: string): void {
    const chapter = this.chapters.find((c) => c.id === chapterId);
    this.store.dispatch(setSelectedChapter({ chapter }));
  }
}
