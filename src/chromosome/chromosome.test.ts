import { describe, expect, test } from '@jest/globals';
import MonogenicTrait from '../trait/monogenic';
import Chromosome from './chromosome';

describe('chromosome', () => {
  test('should be a function', () => {
    expect(Chromosome).toBeInstanceOf(Function);
  });
});

describe('autosome trait', () => {
  const trait = new MonogenicTrait('A', 'a');
  const chromosome = new Chromosome({
    type: 'autosome',
    alleles: [trait.getAllelic()],
  });

  test('should return traits', () => {
    expect(chromosome.getTraits()).toEqual([trait]);
  });
});
