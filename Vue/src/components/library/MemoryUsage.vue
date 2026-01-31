<template>
  <div>
    <div class="row">
      <div class="col-2">
        <label for="id" class="font-weight-bold">Memory Usage:</label>
      </div>
      <div class="col-11 text-left">
        <progress :value="usageInBytes" :max="maxStorageInBytes"></progress>
      </div>
    </div>
    <div class="row">
      <div class="col">
        {{usagePercentage().toFixed(2)}}%
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MemoryUsage extends Vue {
  private id: string = 'memory-usage-2487234';
  private usageInBytes: number = 0;
  private maxStorageInBytes: number = 5 * 1024 * 1024;

  private usagePercentage(): number {
    const onePercent = this.maxStorageInBytes / 100;
    return this.usageInBytes / onePercent;
  }

  private mounted(): void {
    let lsTotal: number = 0;
    let xLen: number = 0;
    let x: any;
    for (x in localStorage) {
      if (!localStorage.hasOwnProperty(x)) {
        continue;
      }
      xLen = ((localStorage[x].length + x.length) * 2);
      lsTotal += xLen;
    }
    this.usageInBytes = lsTotal;
  }
}
</script>

<style scoped>
</style>