import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(message: any): void {
    console.log(message);
  }

  logs(message: any, arg1: any): void {
    console.log(message);
    console.log(arg1);
  }
}
