import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MemoryUsage } from '../memory-usage/memory-usage';
import { AppState } from '../../../state/app-state';
import { selectLibraryName } from '../../../state/app.selectors';
import { setLibraryName } from '../../../state/app.actions';

@Component({
  selector: 'app-library-details',
  imports: [CommonModule, FormsModule, MemoryUsage],
  templateUrl: './library-details.html',
  styleUrl: './library-details.css',
})
export class LibraryDetails implements OnInit {
  libraryName = '';

  constructor(private store: Store<{ app: AppState }>) {}

  ngOnInit(): void {
    this.store
      .select(selectLibraryName)
      .pipe(take(1))
      .subscribe((name) => {
        this.libraryName = name;
      });
  }

  ok(): void {
    this.store.dispatch(setLibraryName({ name: this.libraryName }));
  }

  cancel(): void {
    this.store
      .select(selectLibraryName)
      .pipe(take(1))
      .subscribe((name) => {
        this.libraryName = name;
      });
  }
}
