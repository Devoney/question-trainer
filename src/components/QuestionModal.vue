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
        <div class="modal-body">{{ text }}</div>
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
import bus from '@/MessageBus';
import QuestionModalArgs from '../types/QuestionModalArgs';

@Component
export default class QuestionModal extends Vue {
  private id: string = 'question-modal-id';
  private args!: QuestionModalArgs;
  private cancelText: string = 'Cancel';
  private okText: string = 'Ok';
  private text: string = '';
  private title: string = '';

  private created(): void {
    bus.onShowQuestionModal(this.onShowQuestionModal);
  }

  private onShowQuestionModal(args: QuestionModalArgs) {
    this.args = args;
    this.cancelText = args.cancelButtonText;
    this.okText = args.okButtonText;
    this.text = args.text;
    this.title = args.title;
    $('#' + this.id).modal('show');
  }

  private cancel() {
    const handler = this.args.cancelHandler;
    if (handler === undefined) { return; }
    handler();
  }

  private ok() {
    $('#' + this.id).modal('hide');
    const handler = this.args.okHandler;
    if (handler === undefined) { return; }
    handler();
  }
}
</script>

<style scoped>
</style>