import { describe, expect, test } from '@jest/globals';
import MonogenicTrait from '../trait/monogenic';
import Allele from './allele';

// 대립인자
describe('allele', () => {
  test('should be a function', () => {
    expect(Allele).toBeInstanceOf(Function);
  });
});

// 단일인자 형질 대립인자
describe('monogenic trait allele', () => {
  const trait = new MonogenicTrait('A', 'a');
  const allele = trait.getAllele();

  test('should return a gene', () => {
    expect(allele.getGenes()).toBeInstanceOf(Array);
    expect(allele.getGenes()).toHaveLength(2);
  });

  test('should return a trait', () => {
    expect(allele.getTrait()).toBeInstanceOf(Object);
    expect(allele.getTrait()).toBe(trait);
  });
});
