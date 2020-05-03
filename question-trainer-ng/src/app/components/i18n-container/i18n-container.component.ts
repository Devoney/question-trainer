import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-i18n-container',
  templateUrl: './i18n-container.component.html',
  styleUrls: ['./i18n-container.component.css']
})
export class I18nContainerComponent implements AfterViewInit {

  constructor(
    private i18nService: I18nService,
    private hostElement: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.i18nService.addI18nMessagesFromElementRef(this.hostElement);
  }
}
