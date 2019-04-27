import { assert } from 'chai';
import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import QuestionTrainer from '@/components/questionList/QuestionTrainer.vue';
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
  });
  
});