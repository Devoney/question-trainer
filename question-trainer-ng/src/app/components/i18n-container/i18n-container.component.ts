import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { I18nService } from 'src/app/services/i18n.service';
import { i18n } from 'src/app/enums/i18n';

@Component({
  selector: 'app-i18n-container',
  templateUrl: './i18n-container.component.html',
  styleUrls: ['./i18n-container.component.css']
})
export class I18nContainerComponent implements AfterViewInit {

  i18n: typeof i18n = i18n;

  constructor(
    private i18nService: I18nService,
    private hostElement: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.i18nService.addI18nMessagesFromElementRef(this.hostElement);
  }
}
