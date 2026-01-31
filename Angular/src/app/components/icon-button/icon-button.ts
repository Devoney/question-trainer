import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-icon-button',
  imports: [FontAwesomeModule],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
})
export class IconButtonComponent {
  @Input() label = '';
  @Input() argument: unknown;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() color = 'black';
  @Input() size: 'xs' | 'm' | 'l' = 'xs';
  @Input() outline = false;

  @Output() buttonClick = new EventEmitter<unknown>();

  cssClass(): string {
    let cls = 'btn ';
    cls += `btn-${this.size} `;
    if (this.outline) {
      cls += 'btn-outline-secondary ';
    }
    return cls.trim();
  }

  click(): void {
    this.buttonClick.emit(this.argument);
  }
}
