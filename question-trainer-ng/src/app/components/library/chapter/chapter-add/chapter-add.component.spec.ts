import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterAddComponent } from './chapter-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getEmptyState, getStateWithBooks } from 'test/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookSelectComponent } from '../../book/book-select/book-select.component';
import { getRandomBookWithChapters } from 'test/library';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from 'src/app/store/state/app.state';
import { AddChapter, ChaptersActionTypes } from 'src/app/store/actions/chapters.actions';
import { setTextInput } from 'test/form-controls';

describe('ChapterAddComponent', () => {
  let component: ChapterAddComponent;
  let fixture: ComponentFixture<ChapterAddComponent>;
  let nativeElement: HTMLElement;
  let store: MockStore;
  const book1 = getRandomBookWithChapters(3);
  const book2 = getRandomBookWithChapters(5);
  const initialState = getStateWithBooks(book1, book2);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookSelectComponent,
        ChapterAddComponent
      ],
      imports : [
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  function setSelectedBook(bookId: string) {
    let state = (store.source as BehaviorSubject<IAppState>).value;
    state = {
      ...state,
    };
    state.library = {
      ...state.library,
      bookIdSelected: book2.id
    };
    store.setState(state);
  }
  
  function setNr(nr: string): void {
    setTextInput(nativeElement, '[formcontrolname="nr"]', nr);
  }
  
  function setTitle(title: string): void {
    setTextInput(nativeElement, '[formcontrolname="title"]', title);
  }

  function clickOkButton(): void {
    const okButton = nativeElement.querySelector('#chapter-add-ok') as HTMLButtonElement;
    okButton.click();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Chapter should be added.', () => {
    // Given
    setSelectedBook(book2.id);
    const chapterNr = book2.chapters.length + 1 + '';
    setNr(chapterNr);
    const title = 'My title';
    setTitle(title);
    let action: AddChapter;
    store.scannedActions$.subscribe(a => {
      if(a.type === ChaptersActionTypes.Add) {
        action = a as AddChapter;
      }
    });
    fixture.detectChanges();
  
    // When
    clickOkButton();
  
    // Then
    expect(action).toBeDefined();
    expect(action.bookId).toBe(book2.id);
    expect(action.chapter.nr).toBe(chapterNr);
    expect(action.chapter.title).toBe(title);
    expect(action.chapter.id).toBeDefined();
  });
});
