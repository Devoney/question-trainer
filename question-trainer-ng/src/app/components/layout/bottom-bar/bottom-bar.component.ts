import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { version } from '../../../../../package.json';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {

  applicationVersion: string = version;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }
}
