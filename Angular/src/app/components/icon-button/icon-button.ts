import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-icon-button',
  imports: [FontAwesomeModule, MatButtonModule],
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
    const classes = [`icon-button`, `icon-button-${this.size}`];
    if (this.outline) {
      classes.push('icon-button-outline');
    }
    return classes.join(' ');
  }

  click(): void {
    this.buttonClick.emit(this.argument);
  }
}
