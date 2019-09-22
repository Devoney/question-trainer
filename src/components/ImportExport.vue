<template>
  <div>
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

  private exportLib(): void {
    console.log('export');
  }

  private importLib(): void {
    console.log('Import');
  }
}
</script>

<style scoped>
</style>