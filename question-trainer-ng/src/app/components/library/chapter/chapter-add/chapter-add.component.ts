import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { I18nService } from 'src/app/services/i18n.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  addChapterForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private i18nService: I18nService,
    private formBuilder: FormBuilder,
  ) {
    this.createFormGroup();
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
