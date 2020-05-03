import { Injectable, ElementRef } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  i18nContainer: HTMLElement;

  constructor (
    private logger: LoggerService,
  ) {

  }

  addI18nMessagesFromElementRef(elementRef: ElementRef) {
    this.i18nContainer = elementRef.nativeElement;
  }

  getTranslationByName(name: string): string {
    const htmlElment = this.i18nContainer.querySelector('span[name="' + name + '"]');
    return htmlElment.innerHTML;
  }
}
