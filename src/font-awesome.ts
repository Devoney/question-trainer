import { Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faEdit,
  faExclamationTriangle,
  faMinus,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit);
library.add(faExclamationTriangle);
library.add(faMinus);
library.add(faPlus);
library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
