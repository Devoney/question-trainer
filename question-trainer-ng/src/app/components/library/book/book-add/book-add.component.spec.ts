import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookAddComponent } from './book-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IAppState } from 'src/app/store/state/app.state';
import { AddBook, BooksActionTypes } from 'src/app/store/actions/books.actions';
import { Action } from '@ngrx/store';
import { getEmptyState, getStateWithBooks } from 'test/store';
import { getRandomBook } from 'test/library';
import { i18n } from 'src/app/enums/i18n';
import { I18nService } from 'src/app/services/i18n.service';
import { provideI18nServiceMock } from 'test/I18nService';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  let nativeElement: HTMLElement;
  let store: MockStore;
  const initialState = getEmptyState();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddComponent ],
      imports: [
        ReactiveFormsModule
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

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement as HTMLElement;
  });

  function bookTitleInputElement(): HTMLInputElement {
    return nativeElement.querySelector('input[formcontrolname="bookTitle"]') as HTMLInputElement;
  }

  function getBookTitle(): string {
    const bookTitleInput = bookTitleInputElement();
    return bookTitleInput.value;
  }

  function setBookTitle(value: string): void {
    const bookTitleInput = bookTitleInputElement();
    bookTitleInput.value = value;
    bookTitleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  const buttonId = '#btn-ok-book';

  function getAddButton(): HTMLButtonElement
  {
    return nativeElement.querySelector(buttonId) as HTMLButtonElement;
  }

  function clickAddButton() {
    const addButton = getAddButton();
    addButton.click();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('User interaction', () => {
    it('When user presses add button, without title, no action is dispatched.', () => {
      // Given
      setBookTitle('');
      let action: Action;
      store.scannedActions$.subscribe((act) => {
        if (act.type === BooksActionTypes.Add) {
          action = act as AddBook;
        }
      });

      // When
      clickAddButton();

      // Then
      expect(action).toBeUndefined();
    });

    it('When user presses add button, with title, and action is dispatched with the correct book title.', () => {
      // Given
      const expectedBookTitle = 'My big TOE';
      let actualBookTitle: string = null;
      setBookTitle(expectedBookTitle);
      let action: AddBook;
      store.scannedActions$.subscribe((act) => {
        if (act.type === BooksActionTypes.Add) {
          action = act as AddBook;
          actualBookTitle = action.payload.title;
        }
      });

      // When
      clickAddButton();

      // Then
      expect(action).toBeDefined();
      expect(actualBookTitle).toBe(expectedBookTitle);
    });

    it('When user adds book, the title is emptied.', () => {
      // Given
      setBookTitle('My big TOE');

      // When
      clickAddButton();
      const actualBookTitle = getBookTitle();

      // Then
      expect(actualBookTitle).toBeFalsy();
    });

    it('Without a title the add button is disabled.', () => {
      // Given
      const bookTitle = '';

      // When
      setBookTitle(bookTitle);

      // Then
      const addButton = getAddButton();
      expect(addButton.disabled).toBeTrue();
    });

    it('With a title the add button is enabled.', () => {
      // Given
      const bookTitle = 'My title';

      // When
      setBookTitle(bookTitle);

      // Then
      const addButton = getAddButton();
      expect(addButton.disabled).toBeFalse();
    });

    it('Should show error message that title is in use.', () => {
      // Given
      const book1 = getRandomBook();
      const state = getStateWithBooks(book1);
      store.setState(state);
      const expectedErrorMessage = '' + i18n.TitleAlreadyInUse;

      // When
      setBookTitle(book1.title);

      // Then
      expect(nativeElement.innerHTML).toContain(expectedErrorMessage);
    });

    it('Should not show error message that title is in use.', () => {
      // Given
      const book1 = getRandomBook();
      const state = getStateWithBooks(book1);
      store.setState(state);
      const unexpectedErrorMessage = '' + i18n.TitleAlreadyInUse;
      const newTitle = 'My new title';

      // When
      setBookTitle(newTitle);

      // Then
      expect(nativeElement.innerHTML).not.toContain(unexpectedErrorMessage);
    });
  });
});
