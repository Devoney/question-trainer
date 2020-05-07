import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterAddComponent } from './chapter-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getEmptyState } from 'test/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookSelectComponent } from '../../book/book-select/book-select.component';

describe('ChapterAddComponent', () => {
  let component: ChapterAddComponent;
  let fixture: ComponentFixture<ChapterAddComponent>;
  let nativeElement: HTMLElement;
  let store: MockStore;
  const initialState = getEmptyState();

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

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
