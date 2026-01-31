import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-view-mode-item',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './view-mode-item.html',
  styleUrl: './view-mode-item.css',
})
export class ViewModeItem {
  @Input({ required: true }) viewMode = '';
  @Input({ required: true }) text = '';
  @Input() icon?: string;
  @Input() currentViewMode?: string;

  @Output() select = new EventEmitter<string>();

  viewModeIsActive(): boolean {
    return this.currentViewMode === this.viewMode;
  }

  setViewMode(event: Event): void {
    event.preventDefault();
    if (this.viewModeIsActive()) {
      return;
    }
    this.select.emit(this.viewMode);
  }
}
