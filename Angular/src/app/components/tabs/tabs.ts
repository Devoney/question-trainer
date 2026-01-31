import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPage } from '../tab-page/tab-page';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, TabPage, TranslocoModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements AfterContentInit {
  @ContentChildren(TabPage) tabPageList?: QueryList<TabPage>;

  tabPages: TabPage[] = [];

  ngAfterContentInit(): void {
    this.tabPages = this.tabPageList?.toArray() ?? [];
    this.setActiveTabPage();
  }

  activate(tabPage: TabPage, event: Event): void {
    event.preventDefault();
    this.tabPages.forEach((page) => {
      page.active = page === tabPage;
    });
  }

  private setActiveTabPage(): void {
    if (this.tabPages.length === 0) {
      return;
    }
    const hasActive = this.tabPages.some((page) => page.active);
    if (!hasActive) {
      this.tabPages[0].active = true;
    }
  }
}
