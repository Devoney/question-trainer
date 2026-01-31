import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ViewModeItem } from '../view-mode-item/view-mode-item';
import { AppState } from '../../state/app-state';
import { selectViewMode } from '../../state/app.selectors';
import { setViewMode } from '../../state/app.actions';

@Component({
  selector: 'app-view-mode',
  imports: [CommonModule, FontAwesomeModule, ViewModeItem],
  templateUrl: './view-mode.html',
  styleUrl: './view-mode.css',
})
export class ViewMode {
  readonly viewMode$!: Observable<string>;
  isOpen = false;

  constructor(private store: Store<{ app: AppState }>) {
    this.viewMode$ = this.store.select(selectViewMode);
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  updateViewMode(viewMode: string): void {
    this.store.dispatch(setViewMode({ viewMode }));
    this.closeMenu();
  }
}
