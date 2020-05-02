import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { ConfirmationDialogParams } from 'src/app/types/ui/confirmation-dialog-params';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  @ViewChild('content') content;
  @Input() title: string;
  @Input() question: string;

  constructor(
    private modalService: NgbModal,
    dialogService: DialogService,
  ) {
    dialogService.dialogRequest.subscribe((params) => {
      this.open(params);
    });
  }

  open(params: ConfirmationDialogParams): void {
    this.title = params.title;
    this.question = params.question;
    this.modalService.open(this.content).result.then((answer) => {
      if (answer === 'confirmed') {
        params.confirmed();
      } else if (answer === 'cancelled' && !!params.canceled) {
        params.canceled();
      }
    });
  }
}
