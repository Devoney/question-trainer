import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-usage',
  imports: [CommonModule],
  templateUrl: './memory-usage.html',
  styleUrl: './memory-usage.css',
})
export class MemoryUsage implements OnInit {
  id = 'memory-usage-2487234';
  usageInBytes = 0;
  maxStorageInBytes = 5 * 1024 * 1024;

  usagePercentage(): number {
    const onePercent = this.maxStorageInBytes / 100;
    return this.usageInBytes / onePercent;
  }

  ngOnInit(): void {
    let lsTotal = 0;
    for (const key in localStorage) {
      if (!Object.prototype.hasOwnProperty.call(localStorage, key)) {
        continue;
      }
      const xLen = (localStorage[key].length + key.length) * 2;
      lsTotal += xLen;
    }
    this.usageInBytes = lsTotal;
  }
}
