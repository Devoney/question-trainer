import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectSelectedBookId } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-chapter-manager',
  templateUrl: './chapter-manager.component.html',
  styleUrls: ['./chapter-manager.component.css']
})
export class ChapterManagerComponent implements OnInit {

  isInEditMode$ = new BehaviorSubject<boolean>(false); // Refactor to Observable
  hasBookSelected$: Observable<boolean>;

  constructor(
    private logger: LoggerService,
    private store: Store<IAppState>
  ) {
    this.hasBookSelected$ = this.store.pipe(select(selectSelectedBookId),
      map((selectedBookId) => {
        return !!selectedBookId;
      })
    );
  }

  ngOnInit(): void {
  }

}
