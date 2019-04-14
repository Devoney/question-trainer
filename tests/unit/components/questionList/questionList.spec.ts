import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import QuestionList from '@/components/questionList/QuestionList.vue';
import store from '@/state/store';
import Question from '@/models/Question';
import uuid from 'uuid/v1';

describe('components/questionList/QuestionList', () => {
  it('Instructions are shown on how to add questions is shown if there are none added yet to the list.', () => {
    // Given
    store.state.questionList = [];
    const wrapper = mount(QuestionList, {
      store,
    });

    // When
    const html = wrapper.html();

    // Then
    const index = html.indexOf('Add questions to this list by using');
    assert.notEqual(index, -1, 'No instructions seem to be shown.');
  });

  it('Instructions are not shown on how to add questions if there are questions in the list.', () => {
    // Given
    store.state.questionList = [
      new Question(uuid(), 'Q', 'A', '1'),
    ];
    const wrapper = mount(QuestionList, {
      store,
    });

    // When
    const html = wrapper.html();

    // Then
    const index = html.indexOf('Add questions to this list by using');
    assert.equal(index, -1, 'No instructions should be shown.');
  });

  it('Correct number of questions in the list is shown.', () => {
    // Given
    store.state.questionList = [
      new Question(uuid(), 'Q1', 'A1', '1'),
      new Question(uuid(), 'Q2', 'A2', '2'),
      new Question(uuid(), 'Q3', 'A3', '3'),
    ];
    const wrapper = mount(QuestionList, {
      store,
    });
    const questionsInListElement = wrapper.find('[aria-label="Number of questions in the list."]');

    // When
    const nrOfQuestions = questionsInListElement.text();

    // Then
    assert.equal(nrOfQuestions, '3', 'Incorrect number of questions is shown.');
  });
});
