import { describe, expect, test } from '@jest/globals';
import MonogenicTrait from './monogenic';

describe('dominance expression', () => {
  test('single allele complete dominance (A > a)', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait.toDominanceExpression()).toBe('A > a');
  });

  test('single allele incomplete dominance (A = a)', () => {
    const trait = new MonogenicTrait(['A', 'a']);
    expect(trait.toDominanceExpression()).toBe('A = a');
  });

  test('multiple alleles complete dominance (A > B > C)', () => {
    const trait = new MonogenicTrait('A', 'B', 'C');
    expect(trait.toDominanceExpression()).toBe('A > B > C');
  });

  test('multiple alleles incomplete dominance (A = B > C)', () => {
    const trait = new MonogenicTrait(['A', 'B'], 'C');
    expect(trait.toDominanceExpression()).toBe('A = B > C');
  });

  test('multiple alleles incomplete dominance (A > B = C)', () => {
    const trait = new MonogenicTrait('A', ['B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A > B = C');
  });

  test('multiple alleles incomplete dominance (A = B = C)', () => {
    const trait = new MonogenicTrait(['A', 'B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A = B = C');
  });
});
