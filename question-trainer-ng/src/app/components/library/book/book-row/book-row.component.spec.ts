import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from 'src/app/types/Book';
import { BookRowComponent } from './book-row.component';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { getStateWithBooks } from 'test/store';
import { Guid } from 'src/tools/Guid';
import { i18n } from 'src/app/enums/i18n';
import { I18nService } from 'src/app/services/i18n.service';
import { IconButtonComponent } from 'src/app/components/controls/icon-button/icon-button.component';
import { LoggerService } from 'src/app/services/logger.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RemoveBook, BooksActionTypes, BooksAction, SetBookIdToEdit } from 'src/app/store/actions/books.actions';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;
  let store: MockStore;
  let dialogService: DialogService;
  let nativeElement: HTMLElement;
  const mockI18nService: Partial<I18nService> = {
    getTranslation: (title: i18n) => {
      return '';
    }
  };

  const book: Book = {
    title: 'My title',
    id: Guid.newGuid(),
    chapters: []
  };

  const initialState = getStateWithBooks(book);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookRowComponent,
        FaIconComponent,
        IconButtonComponent,
      ],
      providers: [
        LoggerService,
        provideMockStore({ initialState }),
        DialogService,
        { provide: I18nService, useValue: mockI18nService }
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRowComponent);
    dialogService = TestBed.inject(DialogService);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    component.book = book;
    fixture.detectChanges();
  });

  function clickDeleteButton(): void {
    clickButton('button[title="Trash"]');
  }

  function clickEditButton(): void {
    clickButton('button[title="Edit"]');
  }

  function clickButton(query: string): void {
    const button = nativeElement.querySelector(query) as HTMLButtonElement;
    button.click();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should remove book when confirmed.', () => {
    // Given
    dialogService.dialogRequest.subscribe((params) => {
      params.confirmed();
    });

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

  it('Should not remove book when cancelled.', () => {
    // Given
    dialogService.dialogRequest.subscribe((params) => {
      params.canceled();
    });

    let action: RemoveBook;
    store.scannedActions$.subscribe((act) => {
      if (act.type === BooksActionTypes.Remove) {
        action = act as RemoveBook;
      }
    });

    // When
    clickDeleteButton();

    // Then
    expect(action).toBeUndefined();
  });

  it('Should set book id to edit.', () => {
    // Given
    let action: SetBookIdToEdit;
    store.scannedActions$.subscribe((act) => {
      if (act.type === BooksActionTypes.SetBookIdToEdit) {
        action = act as SetBookIdToEdit;
      }
    });

    // When
    clickEditButton();

    // Then
    expect(action).toBeDefined();
  });
});
