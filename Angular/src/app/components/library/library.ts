import { Component } from '@angular/core';
import { Tabs } from '../tabs/tabs';
import { TabPage } from '../tab-page/tab-page';
import { LibraryDetails } from './library-details/library-details';
import { BookManager } from '../books/book-manager/book-manager';
import { ChapterManager } from '../chapters/chapter-manager/chapter-manager';
import { QuestionManager } from '../questions/question-manager/question-manager';

@Component({
  selector: 'app-library',
  imports: [Tabs, TabPage, LibraryDetails, BookManager, ChapterManager, QuestionManager],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {}
