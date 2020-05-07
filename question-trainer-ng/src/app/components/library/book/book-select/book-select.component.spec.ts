import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSelectComponent } from './book-select.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getEmptyState, getStateWithBooks } from 'test/store';
import { getRandomBook } from 'test/library';
import { BooksActionTypes, SetSelectedBookId } from 'src/app/store/actions/books.actions';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { setSelectValue } from 'test/form-controls';

describe('BookSelectComponent', () => {
  let component: BookSelectComponent;
  let fixture: ComponentFixture<BookSelectComponent>;
  let store: MockStore;
  let nativeElement: HTMLElement;
  const book1 = getRandomBook();
  const book2 = getRandomBook();
  const initialState = getStateWithBooks(book1, book2);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookSelectComponent
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
    fixture = TestBed.createComponent(BookSelectComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set selected book id.', () => {
    // Given
    let setSelectedBookIdAction: SetSelectedBookId;
    store.scannedActions$.subscribe(action => {
      if (action.type === BooksActionTypes.SetSelectedBookId) {
        setSelectedBookIdAction = action as SetSelectedBookId;
      }
    });
    const selectControl = nativeElement.querySelector('.book-selector') as HTMLSelectElement;

    // When
    setSelectValue(selectControl, book2.id);
  
    // Then
    expect(setSelectedBookIdAction).toBeDefined();
    expect(setSelectedBookIdAction.bookId).toBeDefined(book2.id + 'poep');
  });
});
