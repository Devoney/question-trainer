import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { TabPageComponent } from '../tab-page/tab-page.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabPageComponent) tabPageQueryList: QueryList<TabPageComponent>;

  tabPages: Array<TabPageComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    this.tabPages = this.tabPageQueryList.toArray();
    if (this.tabPages.every(tabPage => !tabPage.active)) {
      this.tabPages[0].active = true;
    }
  }

  setActiveTab(tabPageIndex: number) {
    this.tabPages.forEach(tabPage => tabPage.active = false);
    this.tabPages[tabPageIndex].active = true;
  }
}
