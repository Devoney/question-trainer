import { assert } from 'chai';
import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';
import EditChapter from '@/components/chapters/EditChapter.vue';
import store from '@/state/store';
import Chapter from '@/models/Chapter';

describe('components/chapters/EditChapter', () => {
  function mountEditChapter(): Wrapper<Vue> {
    return mount(EditChapter, {
      store,
    });
  }

  function findInputs(wrapper: Wrapper<Vue>): { 
    nr: Wrapper<Vue>, 
    title: Wrapper<Vue>,
  } {
    const nrWrapper = wrapper.find('input[aria-label="Nr of chapter"]');
    const titleWrapper = wrapper.find('input[aria-label="Title of chapter"]');

    return { 
      nr: nrWrapper,
      title: titleWrapper,
    };
  }

  it('Chapter title and nr can be edited.', () => {
    // Given
    const newNr = '2';
    const newTitle = 'Second chapter';
    const chapter = new Chapter('some-id', '1', 'First chapter');
    store.state.chapterEdited = chapter;
    const wrapper = mountEditChapter();
    const okButton = wrapper.find('button');
    const { nr, title } = findInputs(wrapper);
    nr.setValue(newNr);
    title.setValue(newTitle);
    
    // When
    okButton.trigger('click');

    // Then
    assert.equal(chapter.nr, newNr, 'Nr of chapter was not updated.');
    assert.equal(chapter.title, newTitle, 'Title of chapter was not updated.');
  });
});
