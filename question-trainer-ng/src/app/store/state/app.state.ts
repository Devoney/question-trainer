import { ILibraryState, initialLibraryState } from './library.state';

export interface IAppState {
  library: ILibraryState;
}

export const initialAppState = {
  library: initialLibraryState
};

export function getInitialAppState(): IAppState {
  return initialAppState;
}
