import { assert } from 'chai';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import bus from '@/MessageBus';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import QuestionModalArgs from '@/types/QuestionModalArgs';
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
    const wrapper = shallowMount(QuestionRecord, {
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

  it('Question is removed from the list.', () => {
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

  it('Confirmation modal is requested when question is deleted.', () => {
    // Given
    let questionModalArgs: QuestionModalArgs | undefined;
    bus.onShowQuestionModal((args) => {
      questionModalArgs = args;
    });
    const question = new Question(uuid(), 'Question', 'Answer', '1');
    const wrapper = mount(QuestionRecord, {
      propsData: {
        index: 1,
        question,
      },
      store,
    });
    const deleteButton = wrapper.find('button[aria-label="Trash question"]');

    // When
    deleteButton.trigger('click');

    // Then
    assert.notEqual(questionModalArgs, undefined, 'It seems to confirmation modal was now requested.');
    // @ts-ignore
    assert.equal(questionModalArgs.text, 'Are you sure you want to delete this question?', 'The question text seems to be wrong.');
  });

  it('Chapter is deleted when confirmed.', () => {
    // Given
    const firstQuestion = new Question(uuid(), 'A', 'Q', '1');
    const secondQuestion = new Question(uuid(), 'A', 'Q', '2');
    const chapter = new Chapter(uuid(), '1', 'Book', [
      firstQuestion,
      secondQuestion,
    ]);
    store.state.chapterSelected = chapter;
    let questionModalArgs: QuestionModalArgs | undefined;
    bus.onShowQuestionModal((args) => {
      questionModalArgs = args;
    });

    const wrapper = mount(QuestionRecord, {
      propsData: {
        index: 1,
        question: secondQuestion,
      },
      store,
    });
    const deleteButton = wrapper.find('button[aria-label="Trash question"]');

    // When
    deleteButton.trigger('click');
    (questionModalArgs as QuestionModalArgs).okHandler();

    // Then
    assert.equal(chapter.questions.length, 1, 'It seems the question was not deleted');
    const singleQuestion = chapter.questions[0];
    assert.equal(singleQuestion.id, firstQuestion.id, 'The wrong question was deleted.');
  });
});
