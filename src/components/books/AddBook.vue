<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BookBase from '@/components/books/BookBase.vue';

@Component
export default class AddBook extends BookBase {
  @Prop() public errMessage!: string;

  protected buttonText: string = 'Add';

  get invalidTitle(): boolean {
    if (_.isEmpty(this.bookTitle)) { return false; }
    return !_.isEmpty(this.errMessage);
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

  @Watch('errMessage')
  private errMessageChanged(): void {
    this.errorMessage = this.errMessage;
  }

  private mounted(): void {
    this.errorMessage = this.errMessage;
  }
}
</script>