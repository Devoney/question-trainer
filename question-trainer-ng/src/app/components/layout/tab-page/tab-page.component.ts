import { Component, OnInit, Input } from '@angular/core';
import { Guid } from '../../../../tools/Guid';

@Component({
  selector: 'app-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.css']
})
export class TabPageComponent implements OnInit {

  id: string;
  @Input() title: string;
  @Input() active: boolean = false;

  constructor() {
    this.id = 'tabPage_' + Guid.newGuid();
  }

  ngOnInit(): void {
  }

}
