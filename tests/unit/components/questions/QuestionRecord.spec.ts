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
  });

});
