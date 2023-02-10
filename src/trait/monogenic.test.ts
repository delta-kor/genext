import { describe, expect, test } from '@jest/globals';
import Allele from '../allelic/allele';
import MonogenicTrait, {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from './monogenic';

// 단일인자 형질
describe('monogenic trait', () => {
  test('should be a function', () => {
    expect(MonogenicTrait).toBeInstanceOf(Function);
    expect(XLinkedMonogenicTrait).toBeInstanceOf(Function);
    expect(YLinkedMonogenicTrait).toBeInstanceOf(Function);
  });

  test('should return allelic', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait.getAllele()).toBeInstanceOf(Allele);
  });
});

describe('dominance expression', () => {
  // 단대립 완전우성
  test('single allele complete dominance (A > a)', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait.toDominanceExpression()).toBe('A > a');
  });

  // 단대립 불완전우성
  test('single allele incomplete dominance (A = a)', () => {
    const trait = new MonogenicTrait(['A', 'a']);
    expect(trait.toDominanceExpression()).toBe('A = a');
  });

  // 복대립 완전우성
  test('multiple allelic complete dominance (A > B > C)', () => {
    const trait = new MonogenicTrait('A', 'B', 'C');
    expect(trait.toDominanceExpression()).toBe('A > B > C');
  });

  // 복대립 불완정우성
  test('multiple allelic incomplete dominance (A = B > C)', () => {
    const trait = new MonogenicTrait(['A', 'B'], 'C');
    expect(trait.toDominanceExpression()).toBe('A = B > C');
  });

  // 복대립 불완정우성
  test('multiple allelic incomplete dominance (A > B = C)', () => {
    const trait = new MonogenicTrait('A', ['B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A > B = C');
  });

  // 복대립 불완정우성
  test('multiple allelic incomplete dominance (A = B = C)', () => {
    const trait = new MonogenicTrait(['A', 'B', 'C']);
    expect(trait.toDominanceExpression()).toBe('A = B = C');
  });
});

// 연관 단일인자 형질
describe('linked monogenic trait', () => {
  // 독립 형질
  test('independent trait', () => {
    const trait = new MonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });

  // X 연관 형질
  test('X chromosome linked trait', () => {
    const trait = new XLinkedMonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });

  // Y 연관 형질
  test('Y chromosome linked trait', () => {
    const trait = new YLinkedMonogenicTrait('A', 'a');
    expect(trait).toBeInstanceOf(MonogenicTrait);
  });
});
