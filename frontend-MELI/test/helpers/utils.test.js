import { formatNumber } from '@/helpers/utils';

describe('formatNumber function', () => {
  it('formats a number correctly', () => {
    expect(formatNumber(1000)).toBe('1.000');
    expect(formatNumber(1000000)).toBe('1.000.000');
    expect(formatNumber(1234567890)).toBe('1.234.567.890');
  });
});
