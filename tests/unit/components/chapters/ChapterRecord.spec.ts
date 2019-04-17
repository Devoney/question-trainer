import { assert } from 'chai';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import bus from '@/MessageBus';
import Chapter from '@/models/Chapter';
import ChapterRecord from '@/components/chapters/ChapterRecord.vue';
import Question from '@/models/Question';
import store from '@/state/store';
import uuid from 'uuid/v1';
import QuestionModalArgs from '@/types/QuestionModalArgs';
import Book from '@/models/Book';

describe('/components/chapter/ChapterRecord', () => {
  it('Data of chapter is correctly shown', () => {
    // Given
    const chapter = new Chapter('chapter-id', 'nr', 'title', [
        new Question(uuid(), 'How?', 'So', '1'),
        new Question(uuid(), 'When?', 'Now', '2'),
    ]);
    const wrapper = shallowMount(ChapterRecord, {
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
    wrapper.destroy();
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
    wrapper.destroy();
  });

  it('Confirmation modal is requested when chapter is deleted.', () => {
    // Given
    let questionModalArgs: QuestionModalArgs | undefined;
    bus.onShowQuestionModal((args) => {
      questionModalArgs = args;
    });
    const chapter = new Chapter(uuid(), 'Nr', 'Title');
    const wrapper = mount(ChapterRecord, {
      propsData: {
        chapter,
      },
      store,
    });
    const deleteButton = wrapper.find('button[aria-label="Trash chapter"]');

    // When
    deleteButton.trigger('click');

    // Then
    assert.notEqual(questionModalArgs, undefined, 'It seems to confirmation modal was now requested.');
    // @ts-ignore
    assert.equal(questionModalArgs.text, 'Are you sure you want to delete this chapter?', 'The question text seems to be wrong.');
  });

  it('Chapter is deleted when confirmed.', () => {
    // Given
    const firstChapter = new Chapter(uuid(), 'Nr', 'Title');
    const secondChapter = new Chapter(uuid(), 'Nr', 'Title');
    const book = new Book(uuid(), 'Book', [
      firstChapter,
      secondChapter,
    ]);
    store.state.books = [
      book,
    ];
    store.state.bookSelected = book;
    let questionModalArgs: QuestionModalArgs | undefined;
    bus.onShowQuestionModal((args) => {
      questionModalArgs = args;
    });

    const wrapper = mount(ChapterRecord, {
      propsData: {
        chapter: secondChapter,
      },
      store,
    });
    const deleteButton = wrapper.find('button[aria-label="Trash chapter"]');

    // When
    deleteButton.trigger('click');
    (questionModalArgs as QuestionModalArgs).okHandler();

    // Then
    assert.equal(book.chapters.length, 1, 'It seems the chapter was not deleted');
    const singleChapter = book.chapters[0];
    assert.equal(singleChapter.id, firstChapter.id, 'The wrong chapter was deleted.');
  });

});
