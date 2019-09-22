<template>
  <div>
    <a :id="exportLibLinkId" style="display:none"></a>
    <icon-button icon="file-download" label="Export library" argument @click="exportLib" :size="buttonSize"/>
    <icon-button icon="file-upload" label="Import library" argument @click="importLib" :size="buttonSize"/>
    <div class="modal fade" tabindex="-1" role="dialog" :id="importModalId">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Import library</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="file" @change="processFile($event)"/>
          </div>
          <div class="modal-footer">
            <div class="row" style="min-width:100%;">
              <div class="col text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  aria-label="ok"
                  @click="executeImport"
                  :disabled="jsonToImport == null"
                >Import</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';
import $ from 'jquery';
import HTMLInputEvent from '@/types/HTMLInputEvent';

@Component({
  components: {
    IconButton,
  },
})
export default class ImportExport extends mixins(StoreMixin) {
  private buttonSize: string = 'm';
  private exportLibLinkId: string = '38398hfdhf393f98-sfh83';
  private importModalId: string = '0390jafmvi-23n3n';
  private jsonToImport: string | null = null;

  private exportLib(): void {
    const downloadData = this.getDownloadData();
    const downloadElement = this.configureDownloadElement(downloadData);
    downloadElement.click();
  }

  private getDownloadData(): string {
    const storeInJson = JSON.stringify(this.store.state);
    return 'data:text/json;charset=utf-8,' + encodeURIComponent(storeInJson);
  }

  private configureDownloadElement(dataStr: string): HTMLElement {
    const dlAnchorElem = document.getElementById(this.exportLibLinkId);
    if (dlAnchorElem == null) {
      throw new Error('Could not find download link element.');
    }
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'library.json');

    return dlAnchorElem;
  }

  private importLib(): void {
    console.log('Import');
    $('#' + this.importModalId).modal('show');
  }

  private closeModal(): void {
    $('#' + this.importModalId).modal('hide');
  }

  private executeImport(): void {
    if(this.jsonToImport == null) return;
    localStorage.setItem('store', this.jsonToImport as string);
    window.location.reload();
  }

  private processFile(event: HTMLInputEvent): void {
    const target = event.target;
    if (target == null || target.files == null) throw new Error('Could not process selected file because the target is null');
    const file = target.files[0];
    
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const trgt = event.target;
      if(trgt == null) throw new Error('Something went wrong reading the file.');
      this.jsonToImport = trgt.result as string;
    };
    fileReader.readAsText(file);
  }
}
</script>

<style scoped>
</style>