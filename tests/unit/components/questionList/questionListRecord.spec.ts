import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import QuestionListRecord from '@/components/questionList/QuestionListRecord.vue';
import store from '@/state/store';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

describe('components/questionList/questionListRecord', () => {
  it('Data is correctly shown.', () => {
    // Given
    const index: number = 2;
    const questionTextStr = 'My question';
    const question = new Question(uuid(), questionTextStr, 'My answer', '34');
    const wrapper = mount(QuestionListRecord, {
      propsData: {
        index,
        question,
      },
      store,
    });

    // When
    const questionNr = wrapper.find('td[aria-label="Question number"]');
    const questionText = wrapper.find('td[aria-label="Question text"]');

    // Then
    assert.equal(questionText.text(), questionTextStr, 'Question text is not correctly shown.');
    assert.equal(questionNr.text(), index.toString(), 'Question number is not correctly shown.');
    wrapper.destroy();
  });

  it('Question is removed from question list when remove button is clicked.', () => {
    // Given
    const firstQuestionId = uuid();
    const secondQuestionId = uuid();

    const firstQuestion = new Question(firstQuestionId, 'My first question', 'My first answer', '1');
    const secondQuestion = new Question(firstQuestionId, 'My second question', 'My second answer', '2');
    store.state.questionList = [
      firstQuestion,
      secondQuestion,
    ];
    const wrapper = mount(QuestionListRecord, {
      propsData: {
        index: 1,
        question: secondQuestion,
      },
      store,
    });
    const removeButton = wrapper.find('button');

    // When
    removeButton.trigger('click');

    // Then
    assert.equal(store.state.questionList.length, 1, 'No question was removed from the store.');
    const onlyQuestionInList = store.state.questionList[0];
    assert.equal(onlyQuestionInList.id, firstQuestion.id, 'The wrong question has been removed from the store.');
    wrapper.destroy();
  });
});
