<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="cancel"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row" style="min-width:100%;">
              <div class="col text-left">
                <button type="button" class="btn btn-secondary" @click="ok">{{ okText }}</button>
              </div>
              <div class="col text-right">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="cancel"
                >{{ cancelText}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from 'jquery';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmationModal extends Vue {
  @Prop({
    required: true
  }) private id!: string;

  @Prop() private title!: string;
  @Prop({
    default: 'OK'
  }) private okText!: string;
  @Prop({
    default: 'cancel'
  }) private cancelText!: string;

  cancel() {
    this.$emit('cancel');
  }

  ok() {
    this.$emit('ok');
    $('#' + this.id).modal('hide');
  }
}
</script>

<style scoped>
</style>