import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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
  faRedo,
  faRedoAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

export function registerFontAwesomeIcons(library: FaIconLibrary): void {
  library.addIcons(
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
    faRedo,
    faRedoAlt,
    faTrashAlt
  );
}
