import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoService } from '@ngneat/transloco';
import { registerFontAwesomeIcons } from './font-awesome';
import { ImportExport } from './components/import-export/import-export';
import { Library } from './components/library/library';
import { QuestionList } from './components/question-list/question-list/question-list';
import { QuestionTrainer } from './components/question-list/question-trainer/question-trainer';
import { QuestionModal } from './components/question-modal/question-modal';
import { ViewMode } from './components/view-mode/view-mode';
import { AppState } from './state/app-state';
import { selectViewMode, selectVersion } from './state/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    FontAwesomeModule,
    TranslocoModule,
    ImportExport,
    Library,
    QuestionList,
    QuestionTrainer,
    QuestionModal,
    ViewMode
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  private readonly library = inject(FaIconLibrary);
  private readonly transloco = inject(TranslocoService);

  readonly viewMode$ = this.store.select(selectViewMode);
  readonly showLibrary$ = this.viewMode$.pipe(
    map((mode) => mode === 'both' || mode === 'library')
  );
  readonly showQuestions$ = this.viewMode$.pipe(
    map((mode) => mode === 'both' || mode === 'questions')
  );
  readonly version$ = this.store.select(selectVersion);
  activeLang = 'en';

  constructor() {
    registerFontAwesomeIcons(this.library);
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      this.transloco.setActiveLang(storedLang);
    }
    this.activeLang = this.transloco.getActiveLang();
  }

  setLang(lang: 'en' | 'nl'): void {
    this.transloco.setActiveLang(lang);
    this.activeLang = lang;
    localStorage.setItem('lang', lang);
  }
}
