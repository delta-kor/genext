import { describe, expect, test } from '@jest/globals';
import Chromatid from '../chromatid/chromatid';
import MonogenicTrait, {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from '../trait/monogenic';
import Chromosome from './chromosome';

describe('chromosome', () => {
  test('should be a function', () => {
    expect(Chromosome).toBeInstanceOf(Function);
  });
});

// 상염색체 형질 염색체
describe('autosome trait chromosome', () => {
  const trait = new MonogenicTrait('A', 'a');
  const chromosome = new Chromosome({
    type: 'autosome',
    alleles: [trait.getAllele()],
  });

  test('should return type', () => {
    expect(chromosome.getType()).toBe('autosome');
  });

  test('should return traits', () => {
    expect(chromosome.getTraits()).toEqual([trait]);
  });

  test('should create chromatid', () => {
    const chromatid = chromosome.create('A');
    expect(chromatid).toBeInstanceOf(Chromatid);
  });
});

// 성염색체 형질 염색체
describe('allosome trait chromosome', () => {
  const traitA = new MonogenicTrait('A', 'a');
  const traitX = new XLinkedMonogenicTrait('X', 'x');
  const traitY = new YLinkedMonogenicTrait('Y', 'y');

  const chromosome = new Chromosome({
    type: 'allosome',
    alleles: [traitA.getAllele(), traitX.getAllele(), traitY.getAllele()],
  });

  test('should return type', () => {
    expect(chromosome.getType()).toBe('allosome');
  });

  test('should return traits', () => {
    expect(chromosome.getTraits()).toEqual([traitA, traitX, traitY]);
  });

  test('should create x chromatid', () => {
    const chromatid = chromosome.createX('A', 'X');
    expect(chromatid).toBeInstanceOf(Chromatid);
  });

  test('should create y chromatid', () => {
    const chromatid = chromosome.createY('A', 'Y');
    expect(chromatid).toBeInstanceOf(Chromatid);
  });
});
