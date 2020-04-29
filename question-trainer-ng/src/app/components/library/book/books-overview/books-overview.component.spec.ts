import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BooksOverviewComponent } from './books-overview.component';
import { IAppState } from 'src/app/store/state/app.state';

describe('BooksOverviewComponent', () => {
  let component: BooksOverviewComponent;
  let fixture: ComponentFixture<BooksOverviewComponent>;
  let store: MockStore;

  const initialState: IAppState = {
    library: {
      books: []
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksOverviewComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
