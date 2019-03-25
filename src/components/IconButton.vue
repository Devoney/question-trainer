<template>
    <button :disabled="disabled" class="btn btn-xs" :title="label" :aria-label="label" @click="click">
      <font-awesome-icon :icon="icon"/>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DeleteButton extends Vue {
  @Prop({ default: '' }) public label!: string;
  @Prop({ required: true }) public argument!: any;
  @Prop() public icon!: string;
  @Prop() public disabled!: boolean;

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
</style>