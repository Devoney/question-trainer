import QuestionModalArgs from '@/types/QuestionModalArgs';
import Vue from 'vue';

class MessageBus {
  private bus: Vue;

  constructor() {
    this.bus = new Vue();
  }

  public showQuestionModal(args: QuestionModalArgs) {
    this.bus.$emit('showQuestionModal', args);
  }

  public onShowQuestionModal(callback: (args: QuestionModalArgs) => void) {
    this.bus.$on('showQuestionModal', callback);
  }
}
const bus = new MessageBus();
export default bus;
