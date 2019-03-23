import { assert } from 'chai';
import Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import { mount, Wrapper } from '@vue/test-utils';
import _ from 'lodash';
import store from '@/state/store';
import Chapter from '@/models/Chapter';
import AddChapter from '@/components/chapters/AddChapter.vue';
import Book from '@/models/Book';

interface IInputs {
  addButton: Wrapper<Vue>;
  chapterNr: Wrapper<Vue>;
  chapterTitle: Wrapper<Vue>;
}

type WrapperComplex = Wrapper<
  CombinedVueInstance<Vue, object, object, object, Record<never, any>>
>;

describe('components/chapters/AddChapter', () => {
  function findInputs(wrapper: WrapperComplex): IInputs {
    const inputs = wrapper.findAll('input[type="text"]');
    const chapterNr = inputs.at(0);
    const chapterTitle = inputs.at(1);
    const addButton = wrapper.find('button');

    return {
      addButton,
      chapterNr,
      chapterTitle,
    };
  }

  function setValues(inputs: IInputs, nr: string | undefined, title: string | undefined) {
    if (nr !== undefined) {
      inputs.chapterNr.setValue(nr);
    }
    if (title !== undefined) {
      inputs.chapterTitle.setValue(title);
    }
  }

  function getBook() {
    return new Book('some book id', 'My book title');
  }

  it('Chapter can be added.', () => {
    // Given
    store.state.bookSelected = getBook();
    const nr = 'Ch. #1';
    const title = 'My chapter title';
    const wrapper = mount(AddChapter, {
      store,
    });
    const inputs = findInputs(wrapper);
    setValues(inputs, nr, title);

    // When
    inputs.addButton.trigger('click');

    // Then
    assert.equal(store.state.bookSelected.chapters.length, 1, 'No chapter was added to the book.');
    const addedChapter = store.state.bookSelected.chapters[0];
    assert.equal(addedChapter.title, title, 'Title of chapter was not set correctly.');
    assert.equal(addedChapter.nr, nr, 'Chapter number was not set correctly');
    assert.isFalse(_.isEmpty(addedChapter.id), 'Chapter should have gotten an id.');
  });

  it('Chapter cannot be added when chapter number is missing.', () => {
    // Given
    store.state.bookSelected = getBook();
    const nr = undefined;
    const title = 'My chapter title';
    const wrapper = mount(AddChapter, {
      store,
    });
    const inputs = findInputs(wrapper);
    setValues(inputs, nr, title);

    // When
    inputs.addButton.trigger('click');

    // Then
    assert.equal(store.state.bookSelected.chapters.length, 0, 'Chapter should not have been added to the book.');
  });

  it('Chapter cannot be added when title is missing.', () => {
    // Given
    store.state.bookSelected = getBook();
    const nr = 'Ch. #2';
    const title = undefined;
    const wrapper = mount(AddChapter, {
      store,
    });
    const inputs = findInputs(wrapper);
    setValues(inputs, nr, title);

    // When
    inputs.addButton.trigger('click');

    // Then
    assert.equal(store.state.bookSelected.chapters.length, 0, 'Chapter should not have been added to the book.');
  });

  it('Number and title are emptied after adding a chapter.', () => {
    // Given
    store.state.bookSelected = getBook();
    const nr = 'Ch. #1';
    const title = 'My chapter title';
    const wrapper = mount(AddChapter, {
      store,
    });
    const inputs = findInputs(wrapper);
    setValues(inputs, nr, title);

    // When
    inputs.addButton.trigger('click');

    // Then
    const chapterNrValue = (inputs.chapterNr.element as HTMLInputElement).value;
    assert.equal(chapterNrValue, '', 'Chapter number should have been cleared.');
    const chapterTitleValue = (inputs.chapterTitle.element as HTMLInputElement).value;
    assert.equal(chapterTitleValue, '', 'Chapter title should have been cleared.');
  });

  it('Chapter with duplicate title is not added.', () => {
     // Given
     const book = getBook();
     const nr = 'Ch. #1';
     const title = 'My chapter title';
     const chapter = new Chapter('Some id', nr + ' ' + nr, title);
     book.chapters.push(chapter);
     store.state.bookSelected = book;
     assert.equal(
       store.state.bookSelected.chapters.length,
       1,
       'Test is flawed, book should have gotten one chapter already.');

     const wrapper = mount(AddChapter, {
       store,
     });
     const inputs = findInputs(wrapper);
     setValues(inputs, nr, title.toUpperCase());

     // When
     inputs.addButton.trigger('click');

     // Then
     assert.equal(store.state.bookSelected.chapters.length, 1, 'Chapter should not have been added.');
  });

  it('Chapter with duplicate chapter number is not added.', () => {
    // Given
    const book = getBook();
    const nr = 'Ch. #1';
    const title = 'My chapter title';
    const chapter = new Chapter('Some id', nr, title + ' ' + title);
    book.chapters.push(chapter);
    store.state.bookSelected = book;
    assert.equal(
      store.state.bookSelected.chapters.length,
      1,
      'Test is flawed, book should have gotten one chapter already.');

    const wrapper = mount(AddChapter, {
      store,
    });
    const inputs = findInputs(wrapper);
    setValues(inputs, nr, title.toUpperCase());

    // When
    inputs.addButton.trigger('click');

    // Then
    assert.equal(store.state.bookSelected.chapters.length, 1, 'Chapter should not have been added.');
  });
});
