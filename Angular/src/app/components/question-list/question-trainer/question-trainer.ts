import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AppState } from '../../../state/app-state';
import { Question } from '../../../models/question';
import { QuestionTestStatistics } from '../../../types/question-test-statistics';
import { getRandomInt } from '../../../utils/math';
import { IconButtonComponent } from '../../icon-button/icon-button';
import { addToQuestionList, removeFromQuestionList, setCurrentQuestion, setStatistics, toggleRepeat } from '../../../state/app.actions';
import { selectCurrentQuestion, selectQuestionList, selectQuestionStatistics, selectRepeatWrongQuestions } from '../../../state/app.selectors';
import { AnswerCheckerService } from '../../../services/answer-checker.service';
import { take } from 'rxjs/operators';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-question-trainer',
  imports: [CommonModule, FormsModule, CKEditorModule, IconButtonComponent, TranslocoModule],
  templateUrl: './question-trainer.html',
  styleUrl: './question-trainer.css',
})
export class QuestionTrainer implements OnInit {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly answerChecker = inject(AnswerCheckerService);
  answerGiven = '';
  editor = ClassicEditor;
  editorConfig: any = {
    removePlugins: ['EasyImage', 'Heading', 'ImageCaption', 'ImageUpload', 'ImageToolbar', 'MediaEmbed'],
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo']
  };
  showAnswer = false;
  useAiGrading = false;
  aiCheckInProgress = false;
  aiNeedsContinue = false;
  aiFeedback = '';
  aiError = '';
  aiWasCorrect: boolean | null = null;
  aiEndpoint = '';

  private currentQuestion?: Question;
  private questionList: Question[] = [];
  private repeatWrongQuestions = true;
  private statistics = new QuestionTestStatistics();



  ngOnInit(): void {
    const storedAiMode = localStorage.getItem('useAiGrading');
    this.useAiGrading = storedAiMode === 'true';
    this.aiEndpoint = this.answerChecker.getOllamaUrl();
    this.store
      .select(selectCurrentQuestion)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((question) => (this.currentQuestion = question));
    this.store
      .select(selectQuestionList)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((list) => (this.questionList = list));
    this.store
      .select(selectRepeatWrongQuestions)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((repeat) => (this.repeatWrongQuestions = repeat));
    this.store
      .select(selectQuestionStatistics)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((stats) => (this.statistics = stats));
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

  get canCheckAnswer(): boolean {
    return (
      this.hasQuestion &&
      !this.aiCheckInProgress &&
      !this.aiNeedsContinue &&
      this.answerGiven.trim().length > 0
    );
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
    this.resetAiState();
    this.setNextQuestion();
  }

  setNextQuestion(): void {
    this.resetAiState();
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

  toggleAiGrading(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.useAiGrading = !!target?.checked;
    localStorage.setItem('useAiGrading', String(this.useAiGrading));
    this.resetAiState();
    if (!this.useAiGrading) {
      this.aiError = '';
      this.aiFeedback = '';
    }
  }

  updateAiEndpoint(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const endpoint = value || this.answerChecker.getDefaultOllamaUrl();
    this.aiEndpoint = endpoint;
    this.answerChecker.setOllamaUrl(endpoint);
  }

  checkAnswerWithAi(): void {
    if (!this.canCheckAnswer || !this.currentQuestion) {
      return;
    }

    this.aiCheckInProgress = true;
    this.aiError = '';
    this.aiFeedback = '';

    const questionText = this.stripHtml(this.questionHtml);
    const expectedText = this.stripHtml(this.answerHtml);
    const userText = this.stripHtml(this.answerGiven);

    this.answerChecker
      .checkAnswer(questionText, expectedText, userText)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.aiCheckInProgress = false;
          this.aiFeedback = result.reason ?? '';
          this.aiWasCorrect = result.correct;

          if (result.correct) {
            this.incrementCorrectCount();
            this.answerGiven = '';
            this.setNextQuestion();
            return;
          }

          this.incrementWrongCount();
          if (this.repeat && this.currentQuestion) {
            this.store.dispatch(addToQuestionList({ question: this.currentQuestion }));
          }
          this.showAnswer = true;
          this.aiNeedsContinue = true;
        },
        error: () => {
          this.aiCheckInProgress = false;
          this.aiError = 'AI check failed. Please try again.';
        },
      });
  }

  continueAfterAiCheck(): void {
    if (!this.aiNeedsContinue) {
      return;
    }
    this.answerGiven = '';
    this.setNextQuestion();
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

  private resetAiState(): void {
    this.aiCheckInProgress = false;
    this.aiNeedsContinue = false;
    this.aiFeedback = '';
    this.aiError = '';
    this.aiWasCorrect = null;
  }

  private stripHtml(text: string): string {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent ?? element.innerText ?? '';
  }

  takeQuestion(): Question | undefined {
    if (this.questionList.length === 0) {
      return undefined;
    }
    const questionIndex = getRandomInt(0, this.questionList.length - 1);
    return this.questionList[questionIndex];
  }
}
