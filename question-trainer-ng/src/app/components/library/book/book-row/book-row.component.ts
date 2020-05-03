import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/types/book';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoggerService } from 'src/app/services/logger.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { BooksActionTypes, RemoveBook } from 'src/app/store/actions/books.actions';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { ConfirmationDialogParams } from 'src/app/types/ui/confirmation-dialog-params';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: '[app-book-row]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css']
})
export class BookRowComponent implements OnInit {

  @Input() book: Book;
  @Input() index: number;

  trashIcon: IconDefinition = faTrash;

  constructor(
    private logger: LoggerService,
    private store: Store<IAppState>,
    private dialogService: DialogService,
    private i18nService: I18nService,
  ) { }

  ngOnInit(): void {
  }

  onTrash(bookId: string): void {
    
    const params = new ConfirmationDialogParams(
      this.i18nService.getTranslationByName('delete-book'),
      this.i18nService.getTranslationByName('are-you-sure-you-want-to-delete-this-book'),
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
