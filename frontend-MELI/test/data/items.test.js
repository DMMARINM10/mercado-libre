import { itemCondition } from '@/data/items';

describe('itemCondition function', () => {
  it('should return "Nuevo" for condition "new"', () => {
    const condition = 'new';
    const result = itemCondition(condition);
    expect(result).toBe('Nuevo');
  });

  it('should return "Usado" for condition "used"', () => {
    const condition = 'used';
    const result = itemCondition(condition);
    expect(result).toBe('Usado');
  });

  it('should return empty string for an unknown condition', () => {
    const condition = 'unknown';
    const result = itemCondition(condition);
    expect(result).toBe('');
  });
});
