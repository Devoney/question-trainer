<template>
  <div style="width: 70px;">
    <button
      aria-label="remove"
      class="btn btn-xs"
      :title="removeFromText"
      v-on:click="click('remove')"
    >
      <font-awesome-icon icon="minus" :style="{ color: removeColor }"/>
    </button>
    <button aria-label="add" class="btn btn-xs" :title="addToText" v-on:click="click('add')">
      <font-awesome-icon icon="plus" :style="{ color: addColor }"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faMinus);
library.add(faPlus);

@Component
export default class AddOrRemove extends Vue {
  @Prop({ default: 'Add' }) public addToText!: string;
  @Prop({ default: 'Remove' }) public removeFromText!: string;
  @Prop({ default: 'black' }) public addColor!: string;
  @Prop({ default: 'black' }) public removeColor!: string;

  private click(button: string): void {
    this.$emit(button);
  }
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