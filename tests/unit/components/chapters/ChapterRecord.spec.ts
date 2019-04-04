import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import Chapter from '@/models/Chapter';
import ChapterRecord from '@/components/chapters/ChapterRecord.vue';
import Question from '@/models/Question';
import store from '@/state/store';

describe('/components/chapter/ChapterRecord', () => {
  it('Data of chapter is correctly shown', () => {
    // Given
    const chapter = new Chapter('chapter-id', 'nr', 'title', [
        new Question('How?', 'So', 1),
        new Question('When?', 'Now', 2),
    ]);
    const wrapper = mount(ChapterRecord, {
        propsData: {
          chapter,
        },
        store,
    });
    const nr = wrapper.find('td[aria-label="Chapter number"]');
    const title = wrapper.find('td[aria-label="Title of chapter"]');
    const nrOfQuestions = wrapper.find('td[aria-label="Number of questions in this chapter"]');

    // When
    const numberText = nr.text();
    const titleText = title.text();
    const nrOfQuestionsText = nrOfQuestions.text();

    // Then
    assert.equal(numberText, chapter.nr, 'Number of chapter is not correctly shown.');
    assert.equal(titleText, chapter.title, 'Title is not correctly shown.');
    assert.equal(nrOfQuestionsText, '2', 'Incorrect number of questions.');
  });

  it('Chapter is set to be edited when edit button is clicked.', () => {
    // Given
    store.state.chapterEdited = undefined;
    const chapter = new Chapter('chapter-id', 'nr', 'title');
    const wrapper = mount(ChapterRecord, {
        propsData: {
          chapter,
        },
        store,
    });
    const editButton = wrapper.find('button[aria-label="Edit chapter"]');
    // When
    editButton.trigger('click');

    // Then
    // @ts-ignore
    assert.equal(store.state.chapterEdited.id, chapter.id, 'Chapter is not selected for editing.');
  });
});
