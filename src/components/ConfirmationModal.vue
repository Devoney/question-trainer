<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
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
                <button
                  type="button"
                  aria-label="ok"
                  class="btn btn-secondary"
                  @click="ok"
                >{{ okText }}</button>
              </div>
              <div class="col text-right">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  aria-label="cancel"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import 'bootstrap';

@Component
export default class ConfirmationModal extends Vue {
  @Prop({
    required: true,
  }) public id!: string;

  @Prop() public title!: string;
  @Prop({
    default: 'OK',
  }) public okText!: string;
  @Prop({
    default: 'cancel',
  }) public cancelText!: string;

  private cancel() {
    this.$emit('cancel');
  }

  private ok() {
    this.$emit('ok');
    $('#' + this.id).modal('hide');
  }
}
</script>
