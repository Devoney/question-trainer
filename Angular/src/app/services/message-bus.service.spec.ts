import { MessageBusService } from './message-bus.service';
import { QuestionModalArgs } from '../types/question-modal-args';

describe('MessageBusService', () => {
  it('notifies subscribers when showing the question modal', () => {
    const service = new MessageBusService();
    const args = new QuestionModalArgs('title', 'text', () => undefined);
    const callback = vi.fn();

    service.onShowQuestionModal(callback);
    service.showQuestionModal(args);

    expect(callback).toHaveBeenCalledWith(args);
  });
});
