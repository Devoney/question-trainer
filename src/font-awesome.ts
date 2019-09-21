import { Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBook,
  faColumns,
  faEdit,
  faExclamationTriangle,
  faEye,
  faMinus,
  faPlus,
  faQuestionCircle,
  faRedoAlt,
  faTrashAlt,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faColumns);
library.add(faEdit);
library.add(faExclamationTriangle);
library.add(faEye);
library.add(faMinus);
library.add(faPlus);
library.add(faQuestionCircle);
library.add(faRedoAlt);
library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
