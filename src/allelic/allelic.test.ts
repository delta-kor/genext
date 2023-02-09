import { describe, expect, test } from '@jest/globals';
import MonogenicTrait from '../trait/monogenic';
import Allelic from './allelic';

describe('allelic', () => {
  test('should be a function', () => {
    expect(Allelic).toBeInstanceOf(Function);
  });
});

describe('monogenic trait', () => {
  const trait = new MonogenicTrait('A', 'a');
  const allelic = trait.getAllelic();

  test('should return a gene', () => {
    expect(allelic.getGenes()).toBeInstanceOf(Array);
    expect(allelic.getGenes()).toHaveLength(2);
  });

  test('should return a trait', () => {
    expect(allelic.getTrait()).toBeInstanceOf(Object);
    expect(allelic.getTrait()).toBe(trait);
  });
});
