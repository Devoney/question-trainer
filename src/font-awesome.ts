import { Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);
library.add(faMinus);
library.add(faPlus);
library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
