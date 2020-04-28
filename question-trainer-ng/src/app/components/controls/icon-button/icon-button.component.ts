import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFontAwesomeLogoFull } from '@fortawesome/free-solid-svg-icons';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  @Input() icon: IconDefinition = faFontAwesomeLogoFull;
  @Input() disabled = false;
  @Input() title: string;
  @Input() size: string;

  class = 'btn-m';

  constructor(
    private logger: LoggerService,
  ) {

  }

  ngOnInit(): void {
    this.setButtonSize();
  }

  private setButtonSize(): void {
    if (!!this.size) {
      this.class = 'btn-' + this.size;
    }
  }
}
