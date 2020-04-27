import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { libraryReducers } from './library.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  library: libraryReducers
};