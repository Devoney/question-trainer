import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import MutationTypes from '@/state/MutationTypes';
import QuestionTrainer from '@/components/questionList/QuestionTrainer.vue';
import sinon from 'sinon';
import store from '@/state/store';
import Question from '@/models/Question';
import uuid from 'uuid/v1';
import QuestionTestStatistics from '@/types/QuestionTestStatistics';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

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
    stub.restore();
    wrapper.destroy();
    assert.isTrue(stub.calledWith(MutationTypes.QuestionTrainer.setCurrentQuestion, question));
    assert.isTrue(stub.calledWith(MutationTypes.QuestionList.removeFromList, question));
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

  it('Question is shown when loaded.', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    const questionHtml = wrapper.find('[aria-label="Question html"]');

    // Then
    const indexOf = questionHtml.html().indexOf(question.question);
    assert.notEqual(indexOf, -1, 'It seems the question text is not shown.');
    wrapper.destroy();
  });

  it('Answer is hidden when question is loaded.', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    const answerHtml = wrapper.find('[aria-label="Answer html"]');

    // Then
    assert.isFalse(answerHtml.isVisible());
    wrapper.destroy();
  });

  it('\'Click to showAnswer\' is shown when question is loaded.', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });

    // When
    const clickToShow = wrapper.find('.show-answer-banner');

    // Then
    assert.notEqual(clickToShow, undefined);
    assert.isTrue(clickToShow.isVisible());
    wrapper.destroy();
  });

  it('Answer is shown when \'Click to showAnswer\' is clicked.', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const clickToShow = wrapper.find('.show-answer-banner');
    const answerHtml = wrapper.find('[aria-label="Answer html"]');

    // When
    clickToShow.trigger('click');

    // Then
    assert.isFalse(clickToShow.isVisible(), '\'Click to show\' should be hidden.');
    assert.isTrue(answerHtml.isVisible(), 'The answer should be shown');
    wrapper.destroy();
  });

  it('Counter for wrong questions is increased', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const stats = new QuestionTestStatistics();
    const initialWrongCount = 1;
    stats.wrongCount = initialWrongCount;
    const initialCorrectCount = 2;
    stats.correctCount = initialCorrectCount;
    store.state.questionTestStatistics = stats;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const stub = sinon.stub(store, 'commit') as sinon.SinonStub;
    const clickToShow = wrapper.find('.show-answer-banner');
    clickToShow.trigger('click');
    const wrongButton = wrapper.find('button[aria-label="Wrong answer"]');

    // When
    wrongButton.trigger('click');

    // Then
    const expectedWrongCount = initialWrongCount + 1;
    stub.restore();
    wrapper.destroy();
    sinon.assert.calledWith(
      stub,
      MutationTypes.QuestionTrainer.setStatistics,
      sinon.match.has('wrongCount', expectedWrongCount),
    );
  });

  it('Counter for correct questions is increased', () => {
    // Given
    store.state.questionList = [];
    const question = new Question(uuid(), 'My question', 'My answer', '4');
    store.state.currentQuestion = question;
    const stats = new QuestionTestStatistics();
    const initialWrongCount = 1;
    stats.wrongCount = initialWrongCount;
    const initialCorrectCount = 2;
    stats.correctCount = initialCorrectCount;
    store.state.questionTestStatistics = stats;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const stub = sinon.stub(store, 'commit') as sinon.SinonStub;
    const clickToShow = wrapper.find('.show-answer-banner');
    clickToShow.trigger('click');
    const wrongButton = wrapper.find('button[aria-label="Correct answer"]');

    // When
    wrongButton.trigger('click');

    // Then
    const expectedCorrectCount = initialCorrectCount + 1;
    stub.restore();
    wrapper.destroy();
    sinon.assert.calledWith(
      stub,
      MutationTypes.QuestionTrainer.setStatistics,
      sinon.match.has('correctCount', expectedCorrectCount),
    );
  });

  it('Next question is loaded after answering.', () => {
    // Given
    const question1 = new Question(uuid(), 'My question', 'My answer', '4');
    const question2 = new Question(uuid(), 'My question 2', 'My answer 2', '8');
    store.state.questionList = [
      question2,
    ];
    store.state.currentQuestion = question1;
    const wrapper = shallowMount(QuestionTrainer, {
      store,
    });
    const stub = sinon.stub(store, 'commit') as sinon.SinonStub;
    const clickToShow = wrapper.find('.show-answer-banner');
    clickToShow.trigger('click');
    const wrongButton = wrapper.find('button[aria-label="Correct answer"]');

    // When
    wrongButton.trigger('click');

    // Then
    stub.restore();
    wrapper.destroy();
    sinon.assert.calledWith(stub, MutationTypes.QuestionTrainer.setCurrentQuestion, question2);
  });
});
