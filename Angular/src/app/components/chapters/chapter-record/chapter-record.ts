import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import _ from 'lodash';
import { Chapter } from '../../../models/chapter';
import { AppState } from '../../../state/app-state';
import { addToQuestionList, removeChapterById, removeFromQuestionList, setEditedChapter } from '../../../state/app.actions';
import { selectChapterEdited } from '../../../state/app.selectors';
import { AddOrRemove } from '../../add-or-remove/add-or-remove';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { MessageBusService } from '../../../services/message-bus.service';
import { QuestionModalArgs } from '../../../types/question-modal-args';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'tr[app-chapter-record]',
  imports: [CommonModule, AddOrRemove, IconButtonComponent, TranslocoModule],
  templateUrl: './chapter-record.html',
  styleUrl: './chapter-record.css',
})
export class ChapterRecord implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly bus = inject(MessageBusService);
  private readonly destroyRef = inject(DestroyRef);
  @Input({ required: true }) chapter!: Chapter;

  chapterInEditMode = false;

  ngOnInit(): void {
    this.store
      .select(selectChapterEdited)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((edited) => {
        this.chapterInEditMode = !!edited && edited.id === this.chapter.id;
      });
  }

  get nrOfQuestions(): number {
    if (!this.chapter.questions) {
      return 0;
    }
    return this.chapter.questions.length;
  }

  trash(chapter: Chapter): void {
    const args = new QuestionModalArgs(
      'Delete chapter',
      'Are you sure you want to delete this chapter?',
      () => this.trashConfirmed(),
      'Yes',
      'No'
    );
    this.bus.showQuestionModal(args);
  }

  private trashConfirmed(): void {
    this.removeQuestionsFromList();
    this.store.dispatch(removeChapterById({ chapterId: this.chapter.id }));
  }

  edit(chapter: Chapter): void {
    this.store.dispatch(setEditedChapter({ chapter }));
  }

  addQuestionsToList(): void {
    _.forEach(this.chapter.questions, (q) => {
      this.store.dispatch(addToQuestionList({ question: q }));
    });
  }

  removeQuestionsFromList(): void {
    _.forEach(this.chapter.questions, (q) => {
      this.store.dispatch(removeFromQuestionList({ question: q }));
    });
  }
}
