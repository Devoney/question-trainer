import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from '../../state/app-state';
import { selectAppState } from '../../state/app.selectors';
import { dateString } from '../../utils/date-string';
import { IconButtonComponent } from '../icon-button/icon-button';

@Component({
  selector: 'app-import-export',
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './import-export.html',
  styleUrl: './import-export.css',
})
export class ImportExport {
  private readonly store = inject<Store<{ app: AppState }>>(Store);
  buttonSize: 'xs' | 'm' | 'l' = 'm';
  exportLibLinkId = '38398hfdhf393f98-sfh83';
  importModalId = '0390jafmvi-23n3n';
  jsonToImport: string | null = null;
  isImportOpen = false;

  exportLib(): void {
    this.store
      .select(selectAppState)
      .pipe(take(1))
      .subscribe((state) => {
        const downloadData = this.getDownloadData(state);
        const downloadElement = this.configureDownloadElement(downloadData, state.libraryName);
        downloadElement.click();
      });
  }

  getDownloadData(state: AppState): string {
    const storeInJson = JSON.stringify(state);
    return `data:text/json;charset=utf-8,${encodeURIComponent(storeInJson)}`;
  }

  configureDownloadElement(dataStr: string, libraryName: string): HTMLElement {
    const dlAnchorElem = document.getElementById(this.exportLibLinkId);
    if (!dlAnchorElem) {
      throw new Error('Could not find download link element.');
    }
    dlAnchorElem.setAttribute('href', dataStr);
    const dateStr = dateString(new Date());
    const fileName = libraryName?.trim() ? libraryName : 'questiontrainer-library';
    dlAnchorElem.setAttribute('download', `${fileName}_${dateStr}.json`);

    return dlAnchorElem;
  }

  importLib(): void {
    this.isImportOpen = true;
  }

  closeModal(): void {
    this.isImportOpen = false;
  }

  executeImport(): void {
    if (!this.jsonToImport) {
      return;
    }

    localStorage.setItem('store', this.jsonToImport);
    window.location.reload();
  }

  processFile(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target?.files?.length) {
      throw new Error('Could not process selected file because the target is null');
    }
    const file = target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.jsonToImport = fileReader.result as string;
    };
    fileReader.readAsText(file);
  }
}
