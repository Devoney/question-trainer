import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { I18nService } from 'src/app/services/i18n.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'src/app/types/book';
import { selectSelectedBook } from 'src/app/store/selectors/library.selectors';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.css']
})
export class ChapterAddComponent {

  invalidNr$: Observable<boolean>;
  nrErrorMessage$: Observable<boolean>;
  invalidTitle$: Observable<boolean>;
  titleErrorMessage$: Observable<boolean>;
  hasValidInput$ = new BehaviorSubject<boolean>(false);

  nr$ = new BehaviorSubject<string>('');
  title$ = new BehaviorSubject<string>('');
  selectedBook$: Observable<Book>;

  addChapterForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private i18nService: I18nService,
    private formBuilder: FormBuilder,
  ) {
    this.createFormGroup();
    this.handleInputChanged();

    this.selectedBook$ = this.store.pipe(select(selectSelectedBook));
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
        if (!selectedBook) {
          return false;
        }

        const chapterWithNr = selectedBook.chapters.find(c => c.nr === nr);
        return !!chapterWithNr;
      })
    );
  }

  private handleInvalidTitle(): void {
    this.invalidNr$ = combineLatest([
      this.selectedBook$, 
      this.title$
    ]).pipe(
      map(([selectedBook, title]) => {
        if (!selectedBook) {
          return false;
        }

        const chapterWithTitle = selectedBook.chapters.find(c => c.title.toLowerCase() === title.toLowerCase());
        return !!chapterWithTitle;
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
        if (invalidNr || invalidTitle) {
          return false;
        }
        return (!!nr && !!title);
      })
    ).subscribe((hasValidInput) => {
      this.hasValidInput$.next(hasValidInput);
    })
  }

  private createFormGroup(): void {
    this.addChapterForm = this.formBuilder.group({
      nr: '',
      title: '',
    });
  }

  ok(): void {

  }

  cancel(): void {

  }
}