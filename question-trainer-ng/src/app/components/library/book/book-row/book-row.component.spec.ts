import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookRowComponent } from './book-row.component';
import { IAppState } from 'src/app/store/state/app.state';
import { Guid } from 'src/tools/Guid';
import { Book } from 'src/app/types/Book';
import { RemoveBook, BooksActionTypes, BooksAction } from 'src/app/store/actions/books.actions';
import { IconButtonComponent } from 'src/app/components/controls/icon-button/icon-button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { LoggerService } from 'src/app/services/logger.service';
import { I18nService } from 'src/app/services/i18n.service';
import { i18n } from 'src/app/enums/i18n';

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
    fixture = TestBed.createComponent(BookRowComponent);``
    dialogService = TestBed.inject(DialogService);
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
});
