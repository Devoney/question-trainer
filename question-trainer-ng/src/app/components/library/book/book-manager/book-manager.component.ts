import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  invalidTitle$ = new BehaviorSubject<boolean>(false);

  constructor(
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
  }

  onTitleChanged(title: string): void {
    this.logger.log('book-manager.onTitleChanged: ' + title);
    // TODO: Replace this with logic that title is duplicate, etc
    if (title === 'TODO') {
      this.invalidTitle$.next(true);
    } else {
      this.invalidTitle$.next(false);
    }
  }

  add(title: string) {
    // TODO: Add books to the store
    this.logger.log('Add book: ' + title);
  }
}
