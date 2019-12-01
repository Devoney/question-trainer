import { Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBook,
  faColumns,
  faEdit,
  faExclamationTriangle,
  faEye,
  faFileDownload,
  faFileUpload,
  faMinus,
  faPlus,
  faQuestionCircle,
  faRedoAlt,
  faSignOutAlt,
  faTrashAlt,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faColumns);
library.add(faEdit);
library.add(faExclamationTriangle);
library.add(faEye);
library.add(faFileDownload);
library.add(faFileUpload);
library.add(faMinus);
library.add(faPlus);
library.add(faQuestionCircle);
library.add(faRedoAlt);
library.add(faSignOutAlt);
library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
