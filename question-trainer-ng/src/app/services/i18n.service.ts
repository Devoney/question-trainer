import { Injectable, ElementRef } from '@angular/core';
import { LoggerService } from './logger.service';
import { i18n } from '../enums/i18n';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  i18nContainer: HTMLElement;
  cache: { [key: string]: string; } = { };

  constructor (
    private logger: LoggerService,
  ) {

  }

  addI18nMessagesFromElementRef(elementRef: ElementRef) {
    this.i18nContainer = elementRef.nativeElement;
  }

  getTranslation(title: i18n): string {
    const fromCache = this.cache[title];
    if (!!fromCache) {
      this.logger.log(title + ' from cache');
      return fromCache;
    }

    const htmlElment = this.i18nContainer.querySelector('span[title="' + title + '"]');
    const value = htmlElment.innerHTML;
    this.cache[title] = value;
    return value;
  }
}
