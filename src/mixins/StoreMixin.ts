import { Vue } from 'vue-property-decorator';
import { GlobalMixin } from 'vue-typed';
import { Store } from 'vuex';
import IState from '@/state/IState';
import IBookModuleData from '@/state/modules/IBookModuleData';

@GlobalMixin()
export default class StoreMixin extends Vue {
  get store(): Store<IState> {
    return this.$store;
  }

  get storeBook(): IBookModuleData {
    // @ts-ignore
    return this.store.state.book as IBookModuleData;
  }
}
