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

describe('ViewModeComponent', () => {
  let component: ViewModeComponent;
  let fixture: ComponentFixture<ViewModeComponent>;
  let activatedRoute: ActivatedRoute;
  const initialState: IAppState = {
    library: {
      books: []
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookAddComponent,
        BookManagerComponent,
        BooksOverviewComponent,
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
