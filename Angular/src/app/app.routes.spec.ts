import { routes } from './app.routes';

describe('routes', () => {
  it('is defined as an array', () => {
    expect(Array.isArray(routes)).toBe(true);
  });
});
