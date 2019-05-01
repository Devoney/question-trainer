<template>
  <button
    :disabled="disabled"
    :class="cssClass()"
    :title="label"
    :aria-label="label"
    @click="click"
  >
    <font-awesome-icon :icon="icon" :style="{ color: color }"/>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class IconButton extends Vue {
  @Prop({ default: '' }) public label!: string;
  @Prop({ required: true }) public argument!: any;
  @Prop() public icon!: string;
  @Prop() public disabled!: boolean;
  @Prop({ default: 'black' }) public color!: string;
  @Prop({ default: 'xs' }) public size!: string;
  @Prop({ default: false }) public outline!: boolean;

private cssClass(): string {
  let cls = 'btn ';
  cls += 'btn-' + this.size + ' ';
  if (this.outline) {
    cls += 'btn-outline-secondary ';
  }
  return cls;
}
  private click(): void {
    this.$emit('click', this.argument);
  }
}
</script>

<style scoped>
.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 0.5;
  border-radius: 0.2rem;
}

.btn-m {
  /* padding: 0.125rem 0.2rem; */
  font-size: 1.25rem;
  /* line-height: 0.8; */
  border-radius: 0.4rem;
}

.btn-l {
  padding: 0;
  font-size: 2rem;
  line-height: 2;
  border-radius: 1rem;
}
</style>