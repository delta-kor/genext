import { describe, expect, it } from '@jest/globals';
import { MonogenicTrait } from '../src';

describe('monogenic trait', () => {
  const traitA = new MonogenicTrait({ symbol: 'A' });
  const traitB = new MonogenicTrait({ symbol: 'B' });

  it('should be initialized', () => {
    expect(traitA).toBeDefined();
    expect(traitB).toBeDefined();
  });
});
