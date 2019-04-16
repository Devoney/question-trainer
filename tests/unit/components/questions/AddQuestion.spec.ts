import { assert } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import AddQuestion from '@/components/questions/AddQuestion.vue';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';
import store from '@/state/store';
import uuid from 'uuid/v1';
// @ts-ignore
import ckeditor from '@ckeditor/ckeditor5-vue';

describe('/components/questions/AddQuestion', () => {
  it('Question is added to current selected chapter.', () => {
    // Given
    const localVue = createLocalVue();
    localVue.use(ckeditor);
    const chapter = new Chapter('69cc02c2-030d-46cc-af1c-5ac1c9d9a3dc', '#1', 'Chapter title', [
      new Question('de7ea1c7-6933-470e-869e-16607ecee090', 'My first question', 'My first answer', '1'),
    ]);
    store.state.chapterSelected = chapter;
    const wrapper = shallowMount(AddQuestion, {
      localVue,
      store,
    });

    const addButton = wrapper.find('button');

    // When
    // Not so nice to set this private data directly, but unit testing with CKEditor is difficult if not impossible.
    wrapper.vm.$data.question = 'My second question';
    wrapper.vm.$data.answer = 'My second answer';
    addButton.trigger('click');

    // Then
    assert.equal(store.state.chapterSelected.questions.length, 2, 'Question was not added.');
    wrapper.destroy();
  });

  it('Question is not added to current selected chapter when the question is empty.', () => {
    // Given
    const localVue = createLocalVue();
    localVue.use(ckeditor);
    const chapter = new Chapter('69cc02c2-030d-46cc-af1c-5ac1c9d9a3dc', '#1', 'Chapter title', [
      new Question('de7ea1c7-6933-470e-869e-16607ecee090', 'My first question', 'My first answer', '1'),
    ]);
    store.state.chapterSelected = chapter;
    const wrapper = shallowMount(AddQuestion, {
      localVue,
      store,
    });

    const addButton = wrapper.find('button');

    // When
    // Not so nice to set this private data directly, but unit testing with CKEditor is difficult if not impossible.
    wrapper.vm.$data.question = '';
    wrapper.vm.$data.answer = 'My second answer';
    addButton.trigger('click');

    // Then
    assert.equal(store.state.chapterSelected.questions.length, 1, 'Question was not supposed to be added.');
    wrapper.destroy();
  });

  it('Question is not added to current selected chapter when the answer is empty.', () => {
    // Given
    const localVue = createLocalVue();
    localVue.use(ckeditor);
    const chapter = new Chapter('69cc02c2-030d-46cc-af1c-5ac1c9d9a3dc', '#1', 'Chapter title', [
      new Question('de7ea1c7-6933-470e-869e-16607ecee090', 'My first question', 'My first answer', '1'),
    ]);
    store.state.chapterSelected = chapter;
    const wrapper = shallowMount(AddQuestion, {
      localVue,
      store,
    });

    const addButton = wrapper.find('button');

    // When
    // Not so nice to set this private data directly, but unit testing with CKEditor is difficult if not impossible.
    wrapper.vm.$data.question = 'My second question';
    wrapper.vm.$data.answer = '';
    addButton.trigger('click');

    // Then
    assert.equal(store.state.chapterSelected.questions.length, 1, 'Question was not supposed to be added');
    wrapper.destroy();
  });
});
