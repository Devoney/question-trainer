import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterOverviewComponent } from './chapter-overview.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getRandomBook } from 'test/library';
import { getStateWithBooks } from 'test/store';

describe('ChapterOverviewComponent', () => {
  let component: ChapterOverviewComponent;
  let fixture: ComponentFixture<ChapterOverviewComponent>;
  let store: MockStore;
  const book = getRandomBook();
  const initialState = getStateWithBooks(book);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChapterOverviewComponent
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
