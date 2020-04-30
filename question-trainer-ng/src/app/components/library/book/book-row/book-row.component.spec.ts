import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookRowComponent } from './book-row.component';
import { IAppState } from 'src/app/store/state/app.state';
import { Guid } from 'src/tools/Guid';
import { Book } from 'src/app/types/Book';
import { RemoveBook, BooksActionTypes, BooksAction } from 'src/app/store/actions/books.actions';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;
  let store: MockStore;
  let nativeElement: HTMLElement;

  const book: Book = {
    title: 'My title',
    id: Guid.newGuid()
  };

  const initialState: IAppState = {
    library: {
      books: [
        book
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRowComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRowComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    component.book = book;
    fixture.detectChanges();
  });

  function clickDeleteButton(): void {
    const deleteButton = nativeElement.querySelector('app-icon-button[title="Trash"]') as HTMLButtonElement;
    deleteButton.click();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should remove book', () => {
    // Given
    let action: RemoveBook;
    store.scannedActions$.subscribe((act) => {
      if (act.type === BooksActionTypes.Remove) {
        action = act as RemoveBook;
      }
    });

    // When
    clickDeleteButton();

    // Then
    expect(action).toBeDefined();
    expect(action.bookId).toBe(book.id);
  });
});