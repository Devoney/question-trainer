import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, TranslocoModule, MatButtonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModal {
  @Input({ required: true }) id = '';
  @Input() title = '';
  @Input() okText = 'OK';
  @Input() cancelText = 'Cancel';
  @Input() isOpen = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  onOk(): void {
    this.ok.emit();
  }
}
