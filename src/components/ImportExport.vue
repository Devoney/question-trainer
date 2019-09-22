<template>
  <div>
    <a :id="exportLibLinkId" style="display:none"></a>
    <icon-button icon="file-download" label="Export library" argument @click="exportLib" :size="buttonSize"/>
    <icon-button icon="file-upload" label="Import library" argument @click="importLib" :size="buttonSize"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import IconButton from '@/components/IconButton.vue';
import MutationTypes from '@/state/MutationTypes';
import StoreMixin from '@/mixins/StoreMixin';

@Component({
  components: {
    IconButton,
  },
})
export default class ImportExport extends mixins(StoreMixin) {
  private buttonSize: string = 'm';
  private exportLibLinkId = '38398hfdhf393f98-sfh83';

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
  }
}
</script>

<style scoped>
</style>