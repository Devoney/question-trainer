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
    const number = wrapper.find('td[aria-label="Chapter number"]');
    const title = wrapper.find('td[aria-label="Title of chapter"]');
    const nrOfQuestions = wrapper.find('td[aria-label="Number of questions in this chapter"]');

    // When
    const numberText = number.text();
    const titleText = title.text();
    const nrOfQuestionsText = nrOfQuestions.text();

    // Then
    assert.equal(numberText, chapter.nr, 'Number of chapter is not correctly shown.');
    assert.equal(titleText, chapter.title, 'Title is not correctly shown.');
    assert.equal(nrOfQuestionsText, '2', 'Incorrect number of questions.');
  });

  
});
