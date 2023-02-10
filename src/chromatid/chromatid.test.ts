import { describe, expect, test } from '@jest/globals';
import Chromosome from '../chromosome/chromosome';
import MonogenicTrait, {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from '../trait/monogenic';
import Chromatid from './chromatid';

describe('chromatid', () => {
  test('should be a function', () => {
    expect(Chromatid).toBeInstanceOf(Function);
  });
});

// 단일인자 상염색체 형질 염색분체
describe('monogenic trait autosome chromatid', () => {
  const traitA = new MonogenicTrait('A', 'a');
  const traitB = new MonogenicTrait('B', 'b');
  const chromosome = new Chromosome({
    type: 'autosome',
    alleles: [traitA.getAllele(), traitB.getAllele()],
  });
  const chromatid = new Chromatid({ chromosome, genes: ['A', 'b'] });

  test('should return a gene', () => {
    const genes = chromatid.getGenes();

    expect(genes).toBeInstanceOf(Array);
    expect(genes[0].sign).toBe('A');
    expect(genes[1].sign).toBe('b');
  });
});

// 단일인자 성염색체 형질 염색분체
describe('monogenic trait allosome chromatid', () => {
  const traitA = new MonogenicTrait('A', 'a');
  const traitX = new XLinkedMonogenicTrait('X', 'x');
  const traitY = new YLinkedMonogenicTrait('Y', 'y');

  const chromosome = new Chromosome({
    type: 'allosome',
    alleles: [traitA.getAllele(), traitX.getAllele(), traitY.getAllele()],
  });
  const chromatid = new Chromatid({
    chromosome,
    genes: ['A', 'X'],
    chromatidType: 'x',
  });

  test('should return a gene', () => {
    const genes = chromatid.getGenes();

    expect(genes).toBeInstanceOf(Array);
    expect(genes).toHaveLength(2);
    expect(genes[0].sign).toBe('A');
    expect(genes[1].sign).toBe('X');
  });
});
