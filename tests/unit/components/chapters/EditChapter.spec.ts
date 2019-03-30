import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';
import EditChapter from '@/components/chapters/EditChapter.vue';
import store from '@/state/store';
import Chapter from '@/models/Chapter';

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
  });

  it('Edited chapter is set to undefined when accepting edit.', () => {
    // Given
    const chapter = new Chapter('some-id', '1', 'First chapter');
    store.state.chapterEdited = chapter;
    const { okButton } = setup();

    // When
    okButton.trigger('click');

    // Then
    assert.equal(store.state.chapterEdited, undefined, 'The chapter being edited should have been set to undefined.');
  });
});
