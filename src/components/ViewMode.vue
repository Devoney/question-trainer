<template>
  <div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        View mode
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">
          <div class="row">
            <div class="col-3"><icon-button argument="plane" icon="columns"/></div>
            <div class="col">Columns</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import StoreMixin from '@/mixins/StoreMixin';
import MutationTypes from '@/state/MutationTypes';
import IconButton from '@/components/IconButton.vue';

@Component({
  components: {
    IconButton,
  },
})
export default class ViewMode extends mixins(StoreMixin) {
}
</script>

<style scoped>
</style>