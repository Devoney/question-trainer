import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBusService } from '../../services/message-bus.service';
import { QuestionModalArgs } from '../../types/question-modal-args';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-question-modal',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './question-modal.html',
  styleUrl: './question-modal.css',
})
export class QuestionModal {
  private readonly bus = inject(MessageBusService);
  id = 'question-modal-id';
  args?: QuestionModalArgs;
  cancelText = 'Cancel';
  okText = 'Ok';
  text = '';
  title = '';
  isOpen = false;

  constructor() {
    this.bus.onShowQuestionModal((args) => this.onShowQuestionModal(args));
  }

  onShowQuestionModal(args: QuestionModalArgs): void {
    this.args = args;
    this.cancelText = args.cancelButtonText;
    this.okText = args.okButtonText;
    this.text = args.text;
    this.title = args.title;
    this.isOpen = true;
  }

  cancel(): void {
    if (this.args?.cancelHandler) {
      this.args.cancelHandler();
    }
    this.isOpen = false;
  }

  ok(): void {
    this.isOpen = false;
    if (this.args?.okHandler) {
      this.args.okHandler();
    }
  }
}
