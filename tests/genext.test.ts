import { describe, expect, it } from '@jest/globals';
import { MonogenicTrait } from '../src';

describe('single allele monogenic trait', () => {
  const traitA = new MonogenicTrait({ sign: 'A' });
  const traitB = new MonogenicTrait({ sign: 'B', dominance: false });

  it('should be initialized', () => {
    expect(traitA).toBeDefined();
    expect(traitB).toBeDefined();
  });

  it('should have correct dominance expression', () => {
    expect(traitA.toDominanceExpression()).toBe('A > a');
    expect(traitB.toDominanceExpression()).toBe('B = b');
  });
});
