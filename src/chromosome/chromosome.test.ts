import { describe, expect, test } from '@jest/globals';
import MonogenicTrait from '../trait/monogenic';
import Chromosome from './chromosome';

describe('chromosome', () => {
  test('should be a function', () => {
    expect(Chromosome).toBeInstanceOf(Function);
  });
});

describe('autosome trait', () => {
  test('monogenic', () => {
    const trait = new MonogenicTrait('A', 'a');
    const chromosome = new Chromosome({
      type: 'autosome',
      alleles: [trait.getAllelic()],
    });

    expect(chromosome.getTraits()).toEqual([trait]);
  });
});
