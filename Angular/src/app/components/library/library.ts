import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs } from '../tabs/tabs';
import { TabPage } from '../tab-page/tab-page';
import { LibraryDetails } from './library-details/library-details';
import { BookManager } from '../books/book-manager/book-manager';
import { ChapterManager } from '../chapters/chapter-manager/chapter-manager';
import { QuestionManager } from '../questions/question-manager/question-manager';
import { IngestPhoto } from '../ingest-photo/ingest-photo';
import { Settings } from '../settings/settings';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-library',
  imports: [
    CommonModule,
    Tabs,
    TabPage,
    LibraryDetails,
    BookManager,
    ChapterManager,
    QuestionManager,
    IngestPhoto,
    Settings,
    TranslocoModule,
  ],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {}
