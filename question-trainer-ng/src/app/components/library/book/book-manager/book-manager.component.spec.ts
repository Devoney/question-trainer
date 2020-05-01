import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookManagerComponent } from './book-manager.component';
import { IAppState } from 'src/app/store/state/app.state';
import { BookAddComponent } from '../book-add/book-add.component';
import { FormBuilder } from '@angular/forms';
import { BooksOverviewComponent } from '../books-overview/books-overview.component';

describe('BookManagerComponent', () => {
  let component: BookManagerComponent;
  let fixture: ComponentFixture<BookManagerComponent>;
  let store: MockStore;

  const initialState: IAppState = {
    library: {
      books: []
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BookAddComponent,
        BookManagerComponent,
        BooksOverviewComponent,
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
    fixture = TestBed.createComponent(BookManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
