import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import MutationTypes from '@/state/MutationTypes';
import QuestionTrainer from '@/components/questionList/QuestionTrainer.vue';
import sinon from 'sinon';
import store from '@/state/store';
import Question from '@/models/Question';
import uuid from 'uuid/v1';
import QuestionTestStatistics from '@/types/QuestionTestStatistics';

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
    const stub = sinon.stub(store, 'commit') as sinon.SinonStub;
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
    stub.calledWith(MutationTypes.QuestionTrainer.setCurrentQuestion, question);
    stub.calledWith(MutationTypes.Question.removeQuestionById, question.id);
    stub.restore();
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

  it('Statistics, when available, are shown when there is no question in the list or currently shown.', () => {
    // Given
    store.state.questionList = [];
    store.state.currentQuestion = undefined;
    const stats = new QuestionTestStatistics();
    stats.wrongCount = 1;
    stats.correctCount = 2;
    store.state.questionTestStatistics = stats;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    const statisticsElement = wrapper.find('[aria-label="Recent statistics"]');
    const statsWrongCount = wrapper.find('.stats-wrong-count');
    const statsCorrectCount = wrapper.find('.stats-correct-count');

    // Then
    const indexOf = statisticsElement.html().indexOf('You finished last training with');
    assert.notEqual(indexOf, -1, 'Statistics text seems incorrect.');
    assert.equal(statsWrongCount.text(), stats.wrongCount.toString(), 'Wrong count of stats is not shown correctly.');
    assert.equal(statsCorrectCount.text(), stats.correctCount.toString(), 'Correct count of stats is not shown correctly.');
    wrapper.destroy();
  });

});
