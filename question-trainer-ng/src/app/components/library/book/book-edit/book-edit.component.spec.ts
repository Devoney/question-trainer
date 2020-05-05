import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditComponent } from './book-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getEmptyState, getStateWithBooks } from 'test/store';
import { BooksActionTypes, UpdateBook } from 'src/app/store/actions/books.actions';
import { getRandomBook } from 'test/library';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let store: MockStore;
  let nativeElement: HTMLElement;
  const book1 = getRandomBook();
  const book2 = getRandomBook();
  const initialState: IAppState = getStateWithBooks(book1, book2);
  initialState.library.bookIdToEdit = book2.id;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ BookEditComponent ],
      imports: [
        FormsModule,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  function clickEditButton(): void {
    clickButton('#btn-edit-book');
  }

  function clickButton(query: string): void {
    const button = nativeElement.querySelector(query) as HTMLButtonElement;
    button.click();
  }

  function bookTitleInputElement(): HTMLInputElement {
    return nativeElement.querySelector('input[formcontrolname="bookTitle"]') as HTMLInputElement;
  }

  function setBookTitle(value: string): void {
    const bookTitleInput = bookTitleInputElement();
    bookTitleInput.value = value;
    bookTitleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update book upon edit', () => {
    // Given
    const newTitle = 'My new title';
    let action: UpdateBook;
    store.scannedActions$.subscribe((act) => {
      if (act.type === BooksActionTypes.UpdateBook) {
        action = act as UpdateBook;
      }
    });
  
    // When
    setBookTitle(newTitle);
    clickEditButton();
  
    // Then
    expect(action).toBeDefined();
    expect(action.book.id).toBe(book2.id);
    expect(action.book.title).toBe(newTitle);
  });
});
