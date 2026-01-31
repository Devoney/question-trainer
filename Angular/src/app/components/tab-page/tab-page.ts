import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-tab-page',
  imports: [CommonModule],
  templateUrl: './tab-page.html',
  styleUrl: './tab-page.css',
})
export class TabPage implements OnInit {
  @Input() isDefault = false;
  @Input({ required: true }) title = '';

  active = false;
  id = `tabPage_${uuid()}`;

  ngOnInit(): void {
    this.active = this.isDefault;
  }
}
