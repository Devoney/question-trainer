import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppState } from '../../../state/app-state';
import { BookSelector } from '../../books/book-selector/book-selector';
import { ChapterSelector } from '../../chapters/chapter-selector/chapter-selector';
import { Question } from '../../../models/question';
import { addQuestion, editQuestion, setEditedQuestion } from '../../../state/app.actions';
import { selectBookSelected, selectChapterSelected, selectQuestionEdited } from '../../../state/app.selectors';

@Component({
  selector: 'app-add-question',
  imports: [CommonModule, FormsModule, CKEditorModule, BookSelector, ChapterSelector],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css',
})
export class AddQuestion implements OnInit, OnDestroy {
  pageNr = '1';
  editor = ClassicEditor;
  question = '';
  answer = '';
  editorConfig: any = {
    removePlugins: ['EasyImage', 'Heading', 'ImageCaption', 'ImageUpload', 'ImageToolbar', 'MediaEmbed'],
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo']
  };

  private bookSelected = false;
  private chapterSelected = false;
  private inEditMode = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ app: AppState }>) {}

  ngOnInit(): void {
    this.store
      .select(selectBookSelected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((book) => (this.bookSelected = !!book));
    this.store
      .select(selectChapterSelected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((chapter) => (this.chapterSelected = !!chapter));
    this.store
      .select(selectQuestionEdited)
      .pipe(takeUntil(this.destroy$))
      .subscribe((question) => {
        this.inEditMode = !!question;
        if (question) {
          this.question = question.question;
          this.answer = question.answer;
          this.pageNr = question.pageNr;
        } else {
          this.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get bookIsSelected(): boolean {
    return this.bookSelected;
  }

  get buttonText(): string {
    return this.inEditMode ? 'Edit' : 'Add';
  }

  get canSave(): boolean {
    return !_.isEmpty(this.question) && !_.isEmpty(this.answer);
  }

  get chapterIsSelected(): boolean {
    return this.chapterSelected;
  }

  get hasAnswer(): boolean {
    return !_.isEmpty(this.answer);
  }

  get hasQuestion(): boolean {
    return !_.isEmpty(this.question);
  }

  addOrEdit(): void {
    if (!this.canSave) {
      return;
    }

    const id = uuid();
    const question = new Question(id, this.question, this.answer, this.pageNr);

    if (this.inEditMode) {
      this.store.dispatch(editQuestion({ question }));
      this.store.dispatch(setEditedQuestion({ question: undefined }));
    } else {
      this.store.dispatch(addQuestion({ question }));
    }
    this.clear();
  }

  clear(): void {
    this.question = '';
    this.answer = '';
    this.pageNr = '1';
  }
}
