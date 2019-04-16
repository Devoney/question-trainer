import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import { Vue, VueConstructor } from 'vue/types/vue';
import EditChapter from '@/components/chapters/EditChapter.vue';
import store from '@/state/store';
import Chapter from '@/models/Chapter';
import Book from '@/models/Book';

describe('components/chapters/EditChapter', () => {
  function setup(): {
    okButton: Wrapper<Vue>,
    nrInput: Wrapper<Vue>,
    titleInput: Wrapper<Vue>,
    wrapper: Wrapper<Vue>,
  } {
    const wrapper = mount(EditChapter, {
      store,
    });
    const nrInput = wrapper.find('input[aria-label="Nr of chapter"]');
    const okButton = wrapper.find('button');
    const titleInput = wrapper.find('input[aria-label="Title of chapter"]');
    return {
      nrInput,
      okButton,
      titleInput,
      wrapper,
    };
  }

  it('Chapter title and nr can be edited.', () => {
    // Given
    const newNr = '2';
    const newTitle = 'Second chapter';
    const chapter = new Chapter('some-id', '1', 'First chapter');
    store.state.chapterEdited = chapter;
    const { nrInput, okButton, titleInput, wrapper } = setup();
    nrInput.setValue(newNr);
    titleInput.setValue(newTitle);

    // When
    okButton.trigger('click');

    // Then
    assert.equal(chapter.nr, newNr, 'Nr of chapter was not updated.');
    assert.equal(chapter.title, newTitle, 'Title of chapter was not updated.');
    wrapper.destroy();
  });

  it('Edited chapter is set to undefined when accepting edit.', () => {
    // Given
    const chapter = new Chapter('some-id', '1', 'First chapter');
    store.state.chapterEdited = chapter;
    const { okButton, wrapper } = setup();

    // When
    okButton.trigger('click');

    // Then
    assert.equal(store.state.chapterEdited, undefined, 'The chapter being edited should have been set to undefined.');
    wrapper.destroy();
  });

  it('Edited chapter is set to undefined when edit is cancelled.', () => {
    // Given
    const { nrInput, titleInput, wrapper } = setup();
    [nrInput, titleInput].forEach((input) => {
      const chapter = new Chapter('some-id', '1', 'First chapter');
      store.state.chapterEdited = chapter;

      // When
      input.trigger('keydown.esc');

      // Then
      assert.equal(store.state.chapterEdited, undefined, 'The chapter being edited should have been set to undefined.');
      wrapper.destroy();
    });
  });

  it('Error is shown for duplicate title.', () => {
    // Given
    const secondChapterTitle: string = 'Second chapter title.';
    const chapter = new Chapter('some-id', '1', 'First chapter');
    const book = new Book('Book-id', 'Book title', [
      chapter,
      new Chapter('2nd', '2', secondChapterTitle),
    ]);
    store.state.books = [book];
    store.state.bookSelected = book;
    store.state.chapterEdited = chapter;
    const { titleInput, wrapper } = setup();

    // When
    titleInput.setValue(secondChapterTitle);

    // Then
    const titleAttribute = titleInput.attributes('title');
    assert.equal(titleAttribute, 'Title already exists for this book.');
    wrapper.destroy();
  });

  it('Error is shown for duplicate number.', () => {
    // Given
    const secondChapterNumber: string = '2';
    const chapter = new Chapter('some-id', '1', 'First chapter');
    const book = new Book('Book-id', 'Book title', [
      chapter,
      new Chapter('2nd', '2', 'Second chapter title'),
    ]);
    store.state.books = [book];
    store.state.bookSelected = book;
    store.state.chapterEdited = chapter;
    const { nrInput, wrapper } = setup();

    // When
    nrInput.setValue(secondChapterNumber);

    // Then
    const titleAttribute = nrInput.attributes('title');
    assert.equal(titleAttribute, 'Chapter number already exists for this book.');
    wrapper.destroy();
  });
});
