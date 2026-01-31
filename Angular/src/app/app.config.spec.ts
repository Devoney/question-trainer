import { appConfig } from './app.config';

describe('appConfig', () => {
  it('registers expected providers', () => {
    expect(appConfig.providers?.length).toBe(6);
  });
});
