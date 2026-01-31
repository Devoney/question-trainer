import { appConfig } from './app/app.config';
import { App } from './app/app';

vi.mock('@angular/platform-browser', () => ({
  bootstrapApplication: vi.fn().mockResolvedValue({}),
}));

import { bootstrapApplication } from '@angular/platform-browser';

describe('main', () => {
  it('bootstraps App with appConfig', async () => {
    await import('./main');

    expect(bootstrapApplication).toHaveBeenCalledWith(App, appConfig);
  });
});
