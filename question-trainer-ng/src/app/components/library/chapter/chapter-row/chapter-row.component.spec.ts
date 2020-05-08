import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterRowComponent } from './chapter-row.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getStateWithBooks } from 'test/store';
import { getRandomBook } from 'test/library';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('ChapterRowComponent', () => {
  let component: ChapterRowComponent;
  let fixture: ComponentFixture<ChapterRowComponent>;
  let store: MockStore;
  const book = getRandomBook();
  const initialState = getStateWithBooks(book);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChapterRowComponent,
        FaIconComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
