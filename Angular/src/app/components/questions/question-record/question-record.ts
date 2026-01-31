import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../state/app-state';
import { Question } from '../../../models/question';
import { truncateWithDots } from '../../../utils/text-transformers';
import { addToQuestionList, removeFromQuestionList, removeQuestionById, setEditedQuestion } from '../../../state/app.actions';
import { selectQuestionEdited } from '../../../state/app.selectors';
import { AddOrRemove } from '../../add-or-remove/add-or-remove';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { MessageBusService } from '../../../services/message-bus.service';
import { QuestionModalArgs } from '../../../types/question-modal-args';

@Component({
  selector: 'tr[app-question-record]',
  imports: [CommonModule, AddOrRemove, IconButtonComponent],
  templateUrl: './question-record.html',
  styleUrl: './question-record.css'
})
export class QuestionRecord implements OnInit, OnDestroy {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly bus = inject(MessageBusService);
  @Input({ required: true }) index!: number;
  @Input({ required: true }) question!: Question;

  maxLengthText = 40;
  questionInEditMode = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.store
      .select(selectQuestionEdited)
      .pipe(takeUntil(this.destroy$))
      .subscribe((edited) => {
        this.questionInEditMode = !!edited && edited.id === this.question.id;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  answerStr(): string {
    return truncateWithDots(this.question.answer, this.maxLengthText);
  }

  questionStr(): string {
    return truncateWithDots(this.question.question, this.maxLengthText);
  }

  edit(question: Question): void {
    this.store.dispatch(setEditedQuestion({ question }));
  }

  trash(question: Question): void {
    const args = new QuestionModalArgs(
      'Delete question',
      'Are you sure you want to delete this question?',
      () => this.trashConfirmed(),
      'Yes',
      'No'
    );
    this.bus.showQuestionModal(args);
  }

  private trashConfirmed(): void {
    this.store.dispatch(removeQuestionById({ questionId: this.question.id }));
  }

  addQuestionToList(): void {
    this.store.dispatch(addToQuestionList({ question: this.question }));
  }

  removeQuestionFromList(): void {
    this.store.dispatch(removeFromQuestionList({ question: this.question }));
  }
}
