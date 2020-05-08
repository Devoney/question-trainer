import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from 'src/app/types/chapter';
import { Observable, of } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectChaptersOfSelectedBook } from 'src/app/store/selectors/library.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: '[app-chapter-row]',
  templateUrl: './chapter-row.component.html',
  styleUrls: ['./chapter-row.component.css']
})
export class ChapterRowComponent {

  @Input() chapter: Chapter;
  @Input() index: number;

  chapters$: Observable<Array<Chapter>>;

  cannotDelete$: Observable<boolean>;
  isBeingEdited$: Observable<boolean>;

  trashIcon: IconDefinition = faTrash;
  editIcon: IconDefinition = faEdit;

  constructor(
    private store: Store<IAppState>
  ) {
    this.chapters$ = this.store.pipe(select(selectChaptersOfSelectedBook));

    // TODO: Replace dummy values
    this.cannotDelete$ = of(false);
    this.isBeingEdited$ = of(false);
  }

  onEdit(chapterId: string): void {

  }

  onTrash(chapterId: string): void {

  }
}
