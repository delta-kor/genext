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

describe('multi allele monogenic trait', () => {
  const traitA = new MonogenicTrait({ sign: ['A', 'B', 'C'] });
  const traitB = new MonogenicTrait({
    sign: ['D', 'E', 'F'],
    dominance: [1, 1, 0],
  });
  const traitC = new MonogenicTrait({
    sign: ['G', 'H', 'I'],
    dominance: [1, 0, 0],
  });
  const traitD = new MonogenicTrait({
    sign: ['J', 'K', 'L'],
    dominance: [0, 0, 0],
  });

  it('should be initialized', () => {
    expect(traitA).toBeDefined();
    expect(traitB).toBeDefined();
    expect(traitC).toBeDefined();
    expect(traitD).toBeDefined();
  });

  it('should have correct dominance expression', () => {
    expect(traitA.toDominanceExpression()).toBe('A > B > C');
    expect(traitB.toDominanceExpression()).toBe('D = E > F');
    expect(traitC.toDominanceExpression()).toBe('G > H = I');
    expect(traitD.toDominanceExpression()).toBe('J = K = L');
  });
});
