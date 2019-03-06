<template>
  <td style="width: 70px;">
    <button class="btn btn-xs btn-delete-minus" :title="removeFromText">
      <font-awesome-icon icon="minus" :style="{ color: removeColor }"/>
    </button>
    <button class="btn btn-xs" :title="addToText">
      <font-awesome-icon icon="plus" :style="{ color: addColor }"/>
    </button>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faMinus);
library.add(faPlus);

@Component
export default class AddOrRemove extends Vue {
  @Prop({ default: 'Add' }) private addToText!: string;
  @Prop({ default: 'Remove' }) private removeFromText!: string;
  @Prop({ default: 'black'}) private addColor!: string;
  @Prop({ default: 'black'}) private removeColor!: string;
}
</script>

<style scoped>
.btn-group-xs > .btn,
.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 0.5;
  border-radius: 0.2rem;
}
</style>