import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Chapter } from 'src/app/types/chapter';
import { Observable } from 'rxjs';
import { selectChaptersOfSelectedBook } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chapter-overview',
  templateUrl: './chapter-overview.component.html',
  styleUrls: ['./chapter-overview.component.css']
})
export class ChapterOverviewComponent implements OnInit {

  chapters$: Observable<Array<Chapter>>;
  nrOfChapters$: Observable<number>;

  constructor(
    private store: Store<IAppState>
  ) {
    this.chapters$ = this.store.pipe(select(selectChaptersOfSelectedBook));
    this.handleNrOfChapters();
  }

  handleNrOfChapters(): void {
    this.nrOfChapters$ = this.chapters$.pipe(
      map((chapters) => {
        if (!chapters) {
          return 0;
        }
        return chapters.length;
      })
    );
  }

  ngOnInit(): void {
  }

}
