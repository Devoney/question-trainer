import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppState } from '../../../state/app-state';
import { Question } from '../../../models/question';
import { QuestionTestStatistics } from '../../../types/question-test-statistics';
import { getRandomInt } from '../../../utils/math';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { addToQuestionList, removeFromQuestionList, setCurrentQuestion, setStatistics, toggleRepeat } from '../../../state/app.actions';
import { selectCurrentQuestion, selectQuestionList, selectQuestionStatistics, selectRepeatWrongQuestions } from '../../../state/app.selectors';

@Component({
  selector: 'app-question-trainer',
  imports: [CommonModule, FormsModule, CKEditorModule, IconButtonComponent],
  templateUrl: './question-trainer.html',
  styleUrl: './question-trainer.css',
})
export class QuestionTrainer implements OnInit, OnDestroy {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  answerGiven = '';
  editor = ClassicEditor;
  editorConfig: any = {
    removePlugins: ['EasyImage', 'Heading', 'ImageCaption', 'ImageUpload', 'ImageToolbar', 'MediaEmbed'],
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo']
  };
  showAnswer = false;

  private currentQuestion?: Question;
  private questionList: Question[] = [];
  private repeatWrongQuestions = true;
  private statistics = new QuestionTestStatistics();

  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.store
      .select(selectCurrentQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe((question) => (this.currentQuestion = question));
    this.store
      .select(selectQuestionList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.questionList = list));
    this.store
      .select(selectRepeatWrongQuestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe((repeat) => (this.repeatWrongQuestions = repeat));
    this.store
      .select(selectQuestionStatistics)
      .pipe(takeUntil(this.destroy$))
      .subscribe((stats) => (this.statistics = stats));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get answerHtml(): string {
    if (!this.currentQuestion) {
      return '';
    }
    return this.currentQuestion.answer;
  }

  get canStart(): boolean {
    return this.questionList.length > 0 && !this.hasQuestion;
  }

  get hasQuestion(): boolean {
    return this.currentQuestion !== undefined;
  }

  get hasQuestionsInList(): boolean {
    return this.questionList.length > 0;
  }

  get questionHtml(): string {
    if (!this.currentQuestion) {
      return '';
    }
    return this.currentQuestion.question;
  }

  get repeat(): boolean {
    return this.repeatWrongQuestions;
  }

  get showStatistics(): boolean {
    return this.statistics.wrongCount > 0 || this.statistics.correctCount > 0;
  }

  get statisticsView(): QuestionTestStatistics {
    return this.statistics;
  }

  answerIsCorrect(): void {
    this.answerGiven = '';
    this.incrementCorrectCount();
    this.setNextQuestion();
  }

  answerIsWrong(): void {
    this.answerGiven = '';
    this.incrementWrongCount();
    if (this.repeat && this.currentQuestion) {
      this.store.dispatch(addToQuestionList({ question: this.currentQuestion }));
    }
    this.setNextQuestion();
  }

  start(): void {
    this.resetCount();
    this.setNextQuestion();
  }

  setNextQuestion(): void {
    this.showAnswer = false;
    const question = this.takeQuestion();
    this.store.dispatch(setCurrentQuestion({ question }));
    if (question) {
      this.store.dispatch(removeFromQuestionList({ question }));
    }
  }

  toggleRepeat(): void {
    this.store.dispatch(toggleRepeat());
  }

  incrementCorrectCount(): void {
    const correctCount = this.statistics.correctCount + 1;
    this.store.dispatch(setStatistics({ statistics: { correctCount } }));
  }

  incrementWrongCount(): void {
    const wrongCount = this.statistics.wrongCount + 1;
    this.store.dispatch(setStatistics({ statistics: { wrongCount } }));
  }

  resetCount(): void {
    this.store.dispatch(setStatistics({ statistics: { correctCount: 0, wrongCount: 0 } }));
  }

  takeQuestion(): Question | undefined {
    if (this.questionList.length === 0) {
      return undefined;
    }
    const questionIndex = getRandomInt(0, this.questionList.length - 1);
    return this.questionList[questionIndex];
  }
}
