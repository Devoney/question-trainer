import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
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
  readonly viewMode$!: Observable<string>;
  readonly showLibrary$!: Observable<boolean>;
  readonly showQuestions$!: Observable<boolean>;
  readonly version$!: Observable<string>;

  constructor(private store: Store<{ app: AppState }>, library: FaIconLibrary) {
    registerFontAwesomeIcons(library);
    this.viewMode$ = this.store.select(selectViewMode);
    this.showLibrary$ = this.viewMode$.pipe(
      map((mode) => mode === 'both' || mode === 'library')
    );
    this.showQuestions$ = this.viewMode$.pipe(
      map((mode) => mode === 'both' || mode === 'questions')
    );
    this.version$ = this.store.select(selectVersion);
  }
}
