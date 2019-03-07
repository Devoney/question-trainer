<template>
  <tr>
    <td class="text-center" style="width: 70px;">
      <add-or-remove remove-color="red" @add="raiseEvent('add')" @remove="raiseEvent('remove')"/>
    </td>
    <td>
      <span>{{ index }}</span>
    </td>
    <td>
      <span style="cursor: pointer;">{{ title }}</span>
    </td>
    <td class="text-center">
      <div data-bind="html: chapters().length">{{ nrOfChapters }}</div>
    </td>
    <td class="text-center">{{ nrOfQuestions }}</td>
    <td class="text-center table-col-delete">
      <button class="btn btn-xs" @click="raiseEvent('trash')">
        <font-awesome-icon icon="trash-alt"/>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddOrRemove from './AddOrRemove.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faCarAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt);

@Component({
  components: {
    AddOrRemove,
  },
})
export default class BookRecord extends Vue {
  @Prop() private id!: string;
  @Prop() private index!: number;
  @Prop() private nrOfChapters!: number;
  @Prop() private nrOfQuestions!: number;
  @Prop() private title!: string;

  private raiseEvent(eventName: string) {
    this.$emit(eventName, this.id);
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
