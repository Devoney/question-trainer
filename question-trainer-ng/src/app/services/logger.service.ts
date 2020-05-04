import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(... messages: any[]): void {
    messages.forEach((message) => {
      console.log(message);
    });
  }
}
