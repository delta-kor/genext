import { describe, expect, test } from '@jest/globals';
import MonogenicTrait, {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from './monogenic';

describe('monogenic trait', () => {
  test('should be a function', () => {
    expect(MonogenicTrait).toBeInstanceOf(Function);
    expect(XLinkedMonogenicTrait).toBeInstanceOf(Function);
    expect(YLinkedMonogenicTrait).toBeInstanceOf(Function);
  });
});

describe('dominance expression', () => {
  test('single allele complete dominance (A > a)', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait.toDominanceExpression()).toBe('A > a');
  });

  test('single allele incomplete dominance (A = a)', () => {
    const trait = new MonogenicTrait(['A', 'a']);
    expect(trait.toDominanceExpression()).toBe('A = a');
  });

  test('multiple allelic complete dominance (A > B > C)', () => {
    const trait = new MonogenicTrait('A', 'B', 'C');
    expect(trait.toDominanceExpression()).toBe('A > B > C');
  });

  test('multiple allelic incomplete dominance (A = B > C)', () => {
    const trait = new MonogenicTrait(['A', 'B'], 'C');
    expect(trait.toDominanceExpression()).toBe('A = B > C');
  });

  test('multiple allelic incomplete dominance (A > B = C)', () => {
    const trait = new MonogenicTrait('A', ['B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A > B = C');
  });

  test('multiple allelic incomplete dominance (A = B = C)', () => {
    const trait = new MonogenicTrait(['A', 'B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A = B = C');
  });
});

describe('linked monogenic trait', () => {
  test('independent trait', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });

  test('X chromosome linked trait', () => {
    const trait = new XLinkedMonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });

  test('Y chromosome linked trait', () => {
    const trait = new YLinkedMonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });
});
