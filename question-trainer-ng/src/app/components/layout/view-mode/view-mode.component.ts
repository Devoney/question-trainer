import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameters } from '../../../consts/query-parameters';
import { ViewMode } from '../../../enums/view-mode';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent implements OnInit {

  viewMode: ViewMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loggerService: LoggerService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const viewModeStr = paramMap.get(QueryParameters.ViewMode);
      const viewModeEnum = ViewMode[viewModeStr];
      this.viewMode = (!!viewModeEnum) ? viewModeEnum : ViewMode.Both;
      this.loggerService.log('view mode: ' + ViewMode[this.viewMode]);
    });
  }

}
