import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookRowComponent } from './book-row.component';
import { IAppState } from 'src/app/store/state/app.state';
import { Guid } from 'src/tools/Guid';
import { Book } from 'src/app/types/Book';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;
  let store: MockStore;

  const initialState: IAppState = {
    library: {
      books: []
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
    const book: Book = {
      title: 'My title',
      id: Guid.newGuid()
    };
    component.book = book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
