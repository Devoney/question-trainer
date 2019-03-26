<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BookBase from '@/components/books/BookBase.vue';

@Component
export default class AddBook extends BookBase {
  @Prop() public errorMessage!: string;

  protected buttonText: string = 'Add';

  get invalidTitle(): boolean {
    if (_.isEmpty(this.bookTitle)) { return false; }
    return !_.isEmpty(this.errorMessage);
  }

  get errorMessageToShow(): string {
    if (_.isEmpty(this.bookTitle)) { return ''; }
    return this.errorMessage;
  }

  protected ok(): void {
    if (this.invalidTitle) { return; }
    const bookTitle = this.bookTitle;
    if (_.isEmpty(bookTitle)) { return; }
    this.$emit('add', bookTitle);
    this.bookTitle = '';
  }

  protected cancel(): void {
    this.bookTitle = '';
  }

  @Watch('bookTitle')
  private onBookTitleChanged(newTitle: string, oldTitle: string) {
    this.$emit('title-changed', { old: oldTitle, new: newTitle });
  }
}
</script>