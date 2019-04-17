import { assert } from 'chai';
import bus from '@/MessageBus';
import QuestionModalArgs from '@/types/QuestionModalArgs';
import { AssertionError } from 'assert';

describe('MessageBus', () => {
  it('ShowQuestionModal message works.', () => {
    // Given
    let questionModalArgsReceived: QuestionModalArgs | undefined;
    const questionModalArgsGiven = new QuestionModalArgs(
      'My title',
      'Do you want this test to succeed?',
      /* tslint:disable */
      () => {
        
      },
      /* tslint:enable */
      'Yes',
      'No',
      /* tslint:disable */
      () => {
        
      },
      /* tslint:enable */
    );
    bus.onShowQuestionModal((args) => {
      questionModalArgsReceived = args;
    });

    // When
    bus.showQuestionModal(questionModalArgsGiven);

    // Then
    assert.notEqual(questionModalArgsReceived, undefined, 'It seems that the message did not came accross.');
    assert.equal(questionModalArgsReceived, questionModalArgsGiven, 'It seems the arguments got malformed.');
  });
});
