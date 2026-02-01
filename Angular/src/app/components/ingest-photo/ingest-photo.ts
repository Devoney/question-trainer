import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, take } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AppState } from '../../state/app-state';
import { selectBookSelected, selectChapterSelected } from '../../state/app.selectors';
import { addQuestion } from '../../state/app.actions';
import { BookSelector } from '../books/book-selector/book-selector';
import { ChapterSelector } from '../chapters/chapter-selector/chapter-selector';
import { TranslocoModule } from '@ngneat/transloco';
import { PhotoQaIngestionService, IngestedQuestion } from '../../services/photo-qa-ingestion.service';

@Component({
  selector: 'app-ingest-photo',
  imports: [CommonModule, FormsModule, TranslocoModule, BookSelector, ChapterSelector],
  templateUrl: './ingest-photo.html',
  styleUrl: './ingest-photo.css',
})
export class IngestPhoto {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ingestionService = inject(PhotoQaIngestionService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly bookSelected$ = this.store.select(selectBookSelected);
  readonly chapterSelected$ = this.store.select(selectChapterSelected);

  photoPreviewUrl: string | null = null;
  photoBase64: string | null = null;
  fileName = '';
  pageNr = '';
  additionalInstructions = '';
  isLoading = false;
  errorKey: string | null = null;
  generatedQuestions: IngestedQuestion[] = [];
  hasChapterSelected = false;

  constructor() {
    this.store
      .select(selectChapterSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chapter) => {
        this.hasChapterSelected = !!chapter;
      });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target?.files?.length) {
      return;
    }

    const file = target.files[0];
    this.errorKey = null;
    this.generatedQuestions = [];

    if (!file.type.startsWith('image/')) {
      this.errorKey = 'ingestPhoto.errors.invalidFile';
      return;
    }

    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.errorKey = 'ingestPhoto.errors.fileTooLarge';
      return;
    }

    this.fileName = file.name;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result?.toString() ?? '';
      const base64 = result.split(',')[1] ?? '';
      this.photoPreviewUrl = result || null;
      this.photoBase64 = base64 || null;
      this.changeDetectorRef.detectChanges();
    };
    fileReader.readAsDataURL(file);
  }

  generateQuestions(): void {
    if (!this.photoBase64 || !this.hasChapterSelected) {
      return;
    }

    this.isLoading = true;
    this.errorKey = null;
    this.generatedQuestions = [];
    const pageNr = this.pageNr.trim();
    const instructions = this.additionalInstructions.trim();

    this.ingestionService
      .ingestPhoto(this.photoBase64, pageNr || undefined, instructions || undefined)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (items) => {
          const normalized = items.map((item) => ({
            ...item,
            pageNr: pageNr || item.pageNr || undefined,
          }));
          this.generatedQuestions = normalized;
          if (!this.generatedQuestions.length) {
            this.errorKey = 'ingestPhoto.errors.noQuestions';
          }
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.errorKey = 'ingestPhoto.errors.parseFailed';
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  removeGeneratedQuestion(index: number): void {
    this.generatedQuestions.splice(index, 1);
  }

  addToLibrary(): void {
    if (!this.generatedQuestions.length) {
      return;
    }

    this.generatedQuestions.forEach((item) => {
      this.store.dispatch(
        addQuestion({
          question: {
            id: uuid(),
            question: item.question,
            answer: item.answer,
            pageNr: item.pageNr?.trim() ?? '',
          },
        })
      );
    });

    this.generatedQuestions = [];
    this.photoBase64 = null;
    this.photoPreviewUrl = null;
    this.fileName = '';
  }
}
