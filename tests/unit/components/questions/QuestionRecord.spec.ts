import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import Question from '@/models/Question';
import QuestionRecord from '@/components/questions/QuestionRecord.vue';
import store from '@/state/store';
import uuid from 'uuid/v1';

describe('components/questions/QuestionRecord', () => {
  it('Data is correctly shown', () => {
    // Given
    const strQuestion = 'My question';
    const strAnswer = 'My answer';
    const strPageNr = '1';
    const question = new Question(uuid(), strQuestion, strAnswer, strPageNr);
    const wrapper = mount(QuestionRecord, {
      propsData: {
        index: 1,
        question,
      },
      store,
    });

    // When
    const questionElement = wrapper.find('td[aria-label="Question"]');
    const answerElement = wrapper.find('td[aria-label="Answer"]');
    const pageNrElement = wrapper.find('td[aria-label="Page number"]');
    const questionText = questionElement.text();
    const answerText = answerElement.text();
    const pageNrText = pageNrElement.text();

    // Then
    assert.equal(questionText, strQuestion, 'The question is not shown.');
    assert.equal(answerText, strAnswer, 'The answer is not shown.');
    assert.equal(pageNrText, strPageNr, 'The page nr is not shown.');
    wrapper.destroy();
  });

  it('Question is added to the list.', () => {
    // Given
    const question = new Question(uuid(), 'Question', 'Answer', '1');
    store.state.questionList = [];
    const wrapper = mount(QuestionRecord, {
      propsData: {
        index: 1,
        question,
      },
      store,
    });
    const addButton = wrapper.find('button[aria-label="add"]');

    // When
    addButton.trigger('click');

    // Then
    assert.equal(store.state.questionList.length, 1, 'The question was not added to the question list.');
    const singleQuestion = store.state.questionList[0];
    assert.equal(singleQuestion.id, question.id, 'The wrong question was added to the question list.');
    wrapper.destroy();
  });

  it('Question is remove from the list.', () => {
    // Given
    const question = new Question(uuid(), 'Question', 'Answer', '1');
    const secondQuestion = new Question(uuid(), 'Question', 'Answer', '1');
    store.state.questionList = [
      question,
      secondQuestion,
    ];
    const wrapper = mount(QuestionRecord, {
      propsData: {
        index: 1,
        question,
      },
      store,
    });
    const removeButton = wrapper.find('button[aria-label="remove"]');

    // When
    removeButton.trigger('click');

    // Then
    assert.equal(store.state.questionList.length, 1, 'The question was not removed from the question list.');
    const singleQuestion = store.state.questionList[0];
    assert.equal(singleQuestion.id, secondQuestion.id, 'The wrong question was removed from the question list.');
    wrapper.destroy();
  });
});
