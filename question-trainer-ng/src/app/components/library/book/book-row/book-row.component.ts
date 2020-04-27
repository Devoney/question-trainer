import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/types/Book';

@Component({
  selector: '[app-book-row]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css']
})
export class BookRowComponent implements OnInit {

  @Input() book: Book;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
