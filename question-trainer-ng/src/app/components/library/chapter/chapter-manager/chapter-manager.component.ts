import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chapter-manager',
  templateUrl: './chapter-manager.component.html',
  styleUrls: ['./chapter-manager.component.css']
})
export class ChapterManagerComponent implements OnInit {

  isInEditMode$ = new BehaviorSubject<boolean>(false); // Refactor to Observable

  constructor() { }

  ngOnInit(): void {
  }

}
