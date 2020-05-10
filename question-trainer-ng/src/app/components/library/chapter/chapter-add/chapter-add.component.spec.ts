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
import { setTextInput, getTitleOfElement } from 'test/form-controls';
import { provideI18nServiceMock } from 'test/I18nService';
import { i18n } from 'src/app/enums/i18n';

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
        provideI18nServiceMock(),
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

  describe('Chapter addition', () => {
    it('Chapter should be added, with correct data.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = book2.chapters.length + 1 + '';
      setNr(chapterNr);
      const title = 'My title';
      setTitle(title);
      let action: AddChapter;
      store.scannedActions$.subscribe(a => {
        if (a.type === ChaptersActionTypes.Add) {
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

    it('Chapter should not be added when nr is empty.', () => {
      // Given
      setSelectedBook(book2.id);
      const title = 'My title';
      setTitle(title);
      let action: AddChapter;
      store.scannedActions$.subscribe(a => {
        if (a.type === ChaptersActionTypes.Add) {
          action = a as AddChapter;
        }
      });
      fixture.detectChanges();

      // When
      clickOkButton();

      // Then
      expect(action).toBeUndefined();
    });

    it('Chapter should not be added when title is empty.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = '#1';
      setNr(chapterNr);
      let action: AddChapter;
      store.scannedActions$.subscribe(a => {
        if (a.type === ChaptersActionTypes.Add) {
          action = a as AddChapter;
        }
      });
      fixture.detectChanges();

      // When
      clickOkButton();

      // Then
      expect(action).toBeUndefined();
    });

    it('Chapter should not be added when nr already exists.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = book2.chapters[0].nr;
      setNr(chapterNr);
      const title = 'My title';
      setTitle(title);
      let action: AddChapter;
      store.scannedActions$.subscribe(a => {
        if (a.type === ChaptersActionTypes.Add) {
          action = a as AddChapter;
        }
      });
      fixture.detectChanges();

      // When
      clickOkButton();

      // Then
      expect(action).toBeUndefined();
    });

    it('Chapter should not be added when title already exists.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = '#1';
      setNr(chapterNr);
      setTitle(book2.chapters[0].title);
      let action: AddChapter;
      store.scannedActions$.subscribe(a => {
        if (a.type === ChaptersActionTypes.Add) {
          action = a as AddChapter;
        }
      });
      fixture.detectChanges();

      // When
      clickOkButton();

      // Then
      expect(action).toBeUndefined();
    });
  });

  describe('Error messages', () => {
    it('By default should not show error messages.', () => {
      // Given
      setSelectedBook(book2.id);
      const unexpectedErrorMessages: Array<string> = [
        i18n.TitleAlreadyInUse + '',
        i18n.NrAlreadyInuse + '',
      ];

      // When

      // Then
      unexpectedErrorMessages.forEach(unexpectedErrorMessage => {
        expect(nativeElement.innerHTML).not.toContain(unexpectedErrorMessage);
      });
      expect(getTitleOfElement(nativeElement, 'input[formcontrolname="nr"]')).toBeFalsy();
      expect(getTitleOfElement(nativeElement, 'input[formcontrolname="title"]')).toBeFalsy();
    });

    it('Should display error message that nr is already in use.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = book2.chapters[0].nr;
      const expectedErrorMessage = i18n.NrAlreadyInuse + '';

      // When
      setNr(chapterNr);
      fixture.detectChanges();

      // Then
      expect(nativeElement.innerHTML).toContain(expectedErrorMessage);
    });

    it('Should not display error message that nr is already in use.', () => {
      // Given
      setSelectedBook(book2.id);
      const chapterNr = '#1';
      const expectedErrorMessage = i18n.NrAlreadyInuse + '';

      // When
      setNr(chapterNr);
      fixture.detectChanges();

      // Then
      expect(nativeElement.innerHTML).not.toContain(expectedErrorMessage);
    });

    it('Should display error message that title is already in use.', () => {
      // Given
      setSelectedBook(book2.id);
      const title = book2.chapters[0].title;
      const expectedErrorMessage = i18n.TitleAlreadyInUse + '';

      // When
      setTitle(title);
      fixture.detectChanges();

      // Then
      expect(nativeElement.innerHTML).toContain(expectedErrorMessage);
    });

    it('Should not display error message that title is already in use.', () => {
      // Given
      setSelectedBook(book2.id);
      const title = 'My title';
      const expectedErrorMessage = i18n.TitleAlreadyInUse + '';

      // When
      setTitle(title);
      fixture.detectChanges();

      // Then
      expect(nativeElement.innerHTML).not.toContain(expectedErrorMessage);
    });
  });
});
