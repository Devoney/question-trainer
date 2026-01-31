import { appReducer, initialAppState, selectBooks } from './index';

describe('state index', () => {
  it('re-exports reducer and selectors', () => {
    expect(appReducer).toBeDefined();
    expect(initialAppState).toBeDefined();
    expect(selectBooks).toBeDefined();
  });
});
