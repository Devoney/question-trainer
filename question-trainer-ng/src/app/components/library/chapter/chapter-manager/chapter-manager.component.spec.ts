import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagerComponent } from './chapter-manager.component';
import { ChapterAddComponent } from '../chapter-add/chapter-add.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getEmptyState } from 'test/store';
import { BookSelectComponent } from '../../book/book-select/book-select.component';

describe('ChapterManagerComponent', () => {
  let component: ChapterManagerComponent;
  let fixture: ComponentFixture<ChapterManagerComponent>;
  let store: MockStore;

  const initialState = getEmptyState();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookSelectComponent,
        ChapterAddComponent,
        ChapterManagerComponent,
      ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
