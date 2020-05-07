import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeComponent } from './view-mode.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsComponent } from '../tabs/tabs.component';
import { TabPageComponent } from '../tab-page/tab-page.component';
import { BookManagerComponent } from '../../library/book/book-manager/book-manager.component';
import { BookAddComponent } from '../../library/book/book-add/book-add.component';
import { IAppState } from 'src/app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BooksOverviewComponent } from '../../library/book/books-overview/books-overview.component';
import { getEmptyState } from 'test/store';
import { ChapterAddComponent } from '../../library/chapter/chapter-add/chapter-add.component';
import { ChapterManagerComponent } from '../../library/chapter/chapter-manager/chapter-manager.component';
import { BookSelectComponent } from '../../library/book/book-select/book-select.component';

describe('ViewModeComponent', () => {
  let component: ViewModeComponent;
  let fixture: ComponentFixture<ViewModeComponent>;
  let activatedRoute: ActivatedRoute;
  const initialState: IAppState = getEmptyState();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookAddComponent,
        BookManagerComponent,
        BookSelectComponent,
        BooksOverviewComponent,
        ChapterAddComponent,
        ChapterManagerComponent,
        TabPageComponent,
        TabsComponent,
        ViewModeComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModeComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
