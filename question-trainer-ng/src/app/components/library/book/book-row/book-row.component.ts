import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/types/book';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoggerService } from 'src/app/services/logger.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { RemoveBook, SetBookIdToEdit } from 'src/app/store/actions/books.actions';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { ConfirmationDialogParams } from 'src/app/types/ui/confirmation-dialog-params';
import { I18nService } from 'src/app/services/i18n.service';
import { i18n } from 'src/app/enums/i18n';
import { selectBookIdToEdit } from 'src/app/store/selectors/library.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: '[app-book-row]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css']
})
export class BookRowComponent implements OnInit {

  @Input() book: Book;
  @Input() index: number;

  cannotDelete$: Observable<boolean>;
  isBeingEdited$: Observable<boolean>;

  trashIcon: IconDefinition = faTrash;
  editIcon: IconDefinition = faEdit;

  constructor(
    private logger: LoggerService,
    private store: Store<IAppState>,
    private dialogService: DialogService,
    private i18nService: I18nService,
  ) {
    this.cannotDelete$ = this.store.pipe(
      select(selectBookIdToEdit),
      map(bookIdToEdit => !!bookIdToEdit)
    );

    this.isBeingEdited$ = this.store.pipe(
      select(selectBookIdToEdit),
      map(bookIdToEdit => bookIdToEdit === this.book.id)
    );
  }

  ngOnInit(): void {
  }

  onEdit(bookId: string): void {
    const editBookAction = new SetBookIdToEdit(bookId);
    this.store.dispatch(editBookAction);
  }

  onTrash(bookId: string): void {
    const params = new ConfirmationDialogParams(
      this.i18nService.getTranslation(i18n.DeleteBook),
      this.i18nService.getTranslation(i18n.AreYouSureYouWantToDeleteThisBook),
      () => {
        this.delete(bookId);
      },
      () => {
        // Cancel book deletion
      }
    );
    this.dialogService.requestConfirmationDialog(params);
  }

  delete(bookId: string): void {
    this.logger.log('Trashing book with id: ', bookId);
    const removeBookAction = new RemoveBook(bookId);
    this.store.dispatch(removeBookAction);
  }
}
