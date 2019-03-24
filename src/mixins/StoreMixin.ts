import { Vue } from 'vue-property-decorator';
import { GlobalMixin } from 'vue-typed';
import { Store } from 'vuex';
import IState from '@/state/IState';

@GlobalMixin()
export default class StoreMixin extends Vue {
  get store(): Store<IState> {
    return this.$store;
  }
}
