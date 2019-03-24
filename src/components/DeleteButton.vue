<template>
  <div>
    <button class="btn btn-xs" :aria-label="label" @click="trash">
      <font-awesome-icon icon="trash-alt"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DeleteButton extends Vue {
  @Prop({ default: '' }) public label!: string;
  @Prop({ required: true }) public argument!: any;

  private trash(): void {
    this.$emit('trash', this.argument);
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