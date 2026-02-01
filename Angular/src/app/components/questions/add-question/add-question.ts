import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-question',
  imports: [CommonModule, FormsModule, CKEditorModule, BookSelector, ChapterSelector, TranslocoModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css',
})
export class AddQuestion implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
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



  ngOnInit(): void {
    this.store
      .select(selectBookSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((book) => (this.bookSelected = !!book));
    this.store
      .select(selectChapterSelected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chapter) => (this.chapterSelected = !!chapter));
    this.store
      .select(selectQuestionEdited)
      .pipe(takeUntilDestroyed(this.destroyRef))
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
