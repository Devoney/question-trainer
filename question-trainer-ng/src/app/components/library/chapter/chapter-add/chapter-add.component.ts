import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { I18nService } from 'src/app/services/i18n.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'src/app/types/book';
import { selectSelectedBook } from 'src/app/store/selectors/library.selectors';
import { combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { i18n } from 'src/app/enums/i18n';
import { LoggerService } from 'src/app/services/logger.service';
import { AddChapter } from 'src/app/store/actions/chapters.actions';
import { Guid } from 'src/tools/Guid';
import { Chapter } from 'src/app/types/chapter';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.css']
})
export class ChapterAddComponent {

  invalidNr$: Observable<boolean>;
  nrErrorMessage$: Observable<string>;
  invalidTitle$: Observable<boolean>;
  titleErrorMessage$: Observable<string>;
  hasValidInput$ = new BehaviorSubject<boolean>(false);

  nr$ = new BehaviorSubject<string>('');
  title$ = new BehaviorSubject<string>('');
  selectedBook$ = new BehaviorSubject<Book>(null);

  addChapterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private logger: LoggerService,
    private store: Store<IAppState>,
  ) {
    this.createFormGroup();
    this.handleInputChanged();

    this.store.pipe(select(selectSelectedBook)).subscribe(selectedBook => {
      this.selectedBook$.next(selectedBook);
    });

    this.handleInvalidNr();
    this.handleInvalidTitle();
    this.handleHasValidInput();
  }

  private handleInputChanged() {
    this.addChapterForm.valueChanges.subscribe((formValues) => {
      this.nr$.next(formValues.nr);
      this.title$.next(formValues.title);
    });
  }

  private handleInvalidNr(): void {
    this.invalidNr$ = combineLatest([
      this.selectedBook$,
      this.nr$
    ]).pipe(
      map(([selectedBook, nr]) => {
        if (!selectedBook || !nr) {
          return false;
        }

        const chapterWithNr = selectedBook.chapters.find(c => c.nr === nr);
        return !!chapterWithNr;
      })
    );

    this.nrErrorMessage$ = this.invalidNr$
      .pipe(
        map((invalidNr) => {
          if (invalidNr) {
            return this.i18nService.getTranslation(i18n.NrAlreadyInuse);
          }
          return '';
        })
      );
  }

  private handleInvalidTitle(): void {
    this.invalidTitle$ = combineLatest([
      this.selectedBook$,
      this.title$
    ]).pipe(
      map(([selectedBook, title]) => {
        if (!selectedBook || !title) {
          return false;
        }

        const chapterWithTitle = selectedBook.chapters.find(c => c.title.toLowerCase() === title.toLowerCase());
        return !!chapterWithTitle;
      })
    );

    this.titleErrorMessage$ = this.invalidTitle$
      .pipe(
        map((invalidTitle) => {
          if (invalidTitle) {
            return this.i18nService.getTranslation(i18n.TitleAlreadyInUse);
          }
          return '';
        })
      );
  }

  private handleHasValidInput(): void {
    combineLatest([
      this.nr$,
      this.title$,
      this.invalidNr$,
      this.invalidTitle$
    ]).pipe(
      map(([
        nr,
        title,
        invalidNr,
        invalidTitle
      ]) => {
        this.logger.log('handleHasValidInput', { nr, title, invalidNr, invalidTitle });
        if (invalidNr || invalidTitle) {
          return false;
        }
        return (!!nr && !!title);
      })
    ).subscribe((hasValidInput) => {
      this.hasValidInput$.next(hasValidInput);
    });
  }

  private createFormGroup(): void {
    this.addChapterForm = this.formBuilder.group({
      nr: '',
      title: '',
    });
  }

  ok(): void {
    debugger;
    if (!this.hasValidInput$.getValue()) {
      // This should never happen really
      this.logger.log('User pressed add button of chapter while input is invalid');
      return;
    }

    const selectedBookId = this.selectedBook$.getValue().id;
    const chapter: Chapter = {
      id: Guid.newGuid(),
      nr: this.nr$.getValue(),
      title: this.title$.getValue(),
    };

    const addChapterAction = new AddChapter(selectedBookId, chapter);
    this.store.dispatch(addChapterAction);

    this.clear();
  }

  cancel(): void {
    this.clear();
  }

  private clear(): void {
    this.addChapterForm.reset();
  }
}
