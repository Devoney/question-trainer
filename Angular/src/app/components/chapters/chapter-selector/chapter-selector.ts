import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppState } from '../../../state/app-state';
import { Chapter } from '../../../models/chapter';
import { selectChapterSelected, selectChaptersSortedByTitle } from '../../../state/app.selectors';
import { setSelectedChapter } from '../../../state/app.actions';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chapter-selector',
  imports: [CommonModule, FormsModule, TranslocoModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './chapter-selector.html',
  styleUrl: './chapter-selector.css',
})
export class ChapterSelector implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  @Input() showLabel = true;
  @Input() disabled = false;
  chapters: Chapter[] = [];
  selectedChapterId = '';


  ngOnInit(): void {
    this.store
      .select(selectChaptersSortedByTitle)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chapters) => (this.chapters = chapters));
    this.store
      .select(selectChapterSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chapter) => {
        this.selectedChapterId = chapter?.id ?? '';
      });
  }

  onChapterSelected(chapterId: string): void {
    const chapter = this.chapters.find((c) => c.id === chapterId);
    this.store.dispatch(setSelectedChapter({ chapter }));
  }
}
