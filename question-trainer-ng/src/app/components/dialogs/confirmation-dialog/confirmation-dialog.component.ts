import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) {

  }

  open(
    title: string,
    question: string,
    confirmed: () => void,
    cancelled: () => void): void {
    this.title = title;
    this.question = question;
    this.modalService.open(this.content).result.then((answer) => {
      if (answer === 'confirmed') {
        confirmed();
      } else if (answer === 'cancelled') {
        cancelled();
      }
    });
  }
}
