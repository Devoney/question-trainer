import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogParams } from 'src/app/types/ui/confirmation-dialog-params';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRequest = new Subject<ConfirmationDialogParams>();

  constructor() { }

  requestConfirmationDialog(params: ConfirmationDialogParams): void {
    this.dialogRequest.next(params);
  }
}
