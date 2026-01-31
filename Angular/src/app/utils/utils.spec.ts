import { dateString } from './date-string';
import { getRandomInt } from './math';
import { truncateWithDots } from './text-transformers';

describe('utils', () => {
  it('dateString formats the current date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 2, 3, 4, 5));

    expect(dateString(new Date())).toBe('20200102030405');

    vi.useRealTimers();
  });

  it('getRandomInt stays within bounds', () => {
    for (let i = 0; i < 50; i += 1) {
      const value = getRandomInt(1, 3);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(3);
    }
  });

  it('truncateWithDots shortens long text', () => {
    const text = 'This is a long line that should be truncated.';
    expect(truncateWithDots(text, 10)).toContain('...');
  });
});
