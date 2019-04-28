import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import MutationTypes from '@/state/MutationTypes';
import QuestionTrainer from '@/components/questionList/QuestionTrainer.vue';
import sinon from 'sinon';
import store from '@/state/store';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

describe('components/questionList/QuestionTrainer', () => {
  it('Wrong + correct buttons are disabled when question is not loaded.', () => {
    // Given
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const wrongButton = wrapper.find('button[aria-label="Wrong answer"]');
    const correctButton = wrapper.find('button[aria-label="Correct answer"]');

    // When
    store.state.currentQuestion = undefined;

    // Then
    const wrongDisabled = wrongButton.attributes('disabled');
    const correctDisabled = correctButton.attributes('disabled');
    assert.equal(wrongDisabled, 'disabled');
    assert.equal(correctDisabled, 'disabled');
    wrapper.destroy();
  });

  it('Start is disabled when question list is empty.', () => {
    // Given
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const startButton = wrapper.find('button[aria-label="Start training"]');

    // When
    store.state.questionList = [];

    // Then
    const startDisiabled = startButton.attributes('disabled');
    assert.equal(startDisiabled, 'disabled');
    wrapper.destroy();
  });

  it('Start is enabled when there are questions in the list.', () => {
    // Given
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const startButton = wrapper.find('button[aria-label="Start training"]');

    // When
    store.state.questionList = [
      new Question(uuid(), 'Quesion', 'Answer', '1'),
    ];

    // Then
    const startDisiabled = startButton.attributes('disabled');
    assert.equal(startDisiabled, undefined);
    wrapper.destroy();
  });

  it('Pressing start loads question from the list.', () => {
    // Given
    const spy = sinon.spy(store, 'commit') as sinon.SinonSpy;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const question = new Question(uuid(), 'Quesion', 'Answer', '1');
    const startButton = wrapper.find('button[aria-label="Start training"]');
    store.state.questionList = [
      question,
    ];

    // When
    startButton.trigger('click');

    // Then
    spy.calledWith(MutationTypes.QuestionTrainer.setCurrentQuestion, question);
    spy.restore();
    wrapper.destroy();
  });

  it('Instruction to start training is shown when there are questions in the question list and no question is shown.', () => {
    // Given
    const question = new Question(uuid(), 'Quesion', 'Answer', '1');
    store.state.currentQuestion = undefined;
    store.state.questionList = [
      question,
    ];
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    const html = wrapper.html();
    debugger;

    // Then
    const index = html.indexOf('Press Start to begin training');
    assert.notEqual(index, -1);
    wrapper.destroy();
  });

  it('Instruction to start training is not shown when there are no questions in the question list.', () => {
    // Given
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    store.state.questionList = [];

    // Then
    const html = wrapper.html();
    const index = html.indexOf('Press Start to begin training');
    assert.equal(index, -1);
    wrapper.destroy();
  });
});
