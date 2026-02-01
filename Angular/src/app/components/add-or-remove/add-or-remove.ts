import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-or-remove',
  imports: [FontAwesomeModule, TranslocoModule, MatButtonModule],
  templateUrl: './add-or-remove.html',
  styleUrl: './add-or-remove.css',
})
export class AddOrRemove {
  @Input() addToText = 'Add';
  @Input() removeFromText = 'Remove';
  @Input() addColor = 'black';
  @Input() removeColor = 'black';

  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  click(button: 'add' | 'remove'): void {
    if (button === 'add') {
      this.add.emit();
    } else {
      this.remove.emit();
    }
  }
}
