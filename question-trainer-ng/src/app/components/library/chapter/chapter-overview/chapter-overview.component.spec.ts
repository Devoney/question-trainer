import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterOverviewComponent } from './chapter-overview.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getRandomBook, getRandomBookWithChapters } from 'test/library';
import { getStateWithBooks } from 'test/store';
import { selectChaptersOfSelectedBook } from 'src/app/store/selectors/library.selectors';

describe('ChapterOverviewComponent', () => {
  let component: ChapterOverviewComponent;
  let fixture: ComponentFixture<ChapterOverviewComponent>;
  let store: MockStore;
  let nativeElement: HTMLElement;
  const book = getRandomBookWithChapters(3);
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
    store.overrideSelector(selectChaptersOfSelectedBook, book.chapters);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterOverviewComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render a row for each chapter of the selected book.', () => {
    // Given
    // When
    const nrOfChapterRows = nativeElement.querySelectorAll('tr[app-chapter-row]').length;

    // Then
    expect(nrOfChapterRows).toBe(book.chapters.length);
  });
});
