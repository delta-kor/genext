import Allele from '../allelic/allele';
import Chromatid from '../chromatid/chromatid';
import {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from '../trait/monogenic';
import { Trait } from '../trait/trait';

export type ChromosomeType = 'allosome' | 'autosome';

export interface ChromosomeConfig {
  type: ChromosomeType;
  alleles: Allele[];
}

export default class Chromosome {
  private readonly type: ChromosomeType;
  private readonly alleles: Allele[] = [];

  constructor(config: ChromosomeConfig) {
    for (const allele of config.alleles) {
      const trait = allele.getTrait();
      if (config.type === 'autosome') {
        if (trait instanceof XLinkedMonogenicTrait)
          throw new Error(
            'X-linked monogenic trait cannot be used in autosome.'
          );
        if (trait instanceof YLinkedMonogenicTrait)
          throw new Error(
            'Y-linked monogenic trait cannot be used in autosome.'
          );
      }
    }

    this.type = config.type;
    this.alleles = config.alleles;
  }

  public create(...genes: string[]): Chromatid {
    if (this.type === 'allosome')
      throw new Error('Allosome chromosome cannot create autosome chromatid.');
    return new Chromatid({ chromosome: this, genes });
  }

  public createX(...genes: string[]): Chromatid {
    if (this.type === 'autosome')
      throw new Error('Autosome chromosome cannot create allosome chromatid.');
    return new Chromatid({ chromosome: this, genes, chromatidType: 'x' });
  }

  public createY(...genes: string[]): Chromatid {
    if (this.type === 'autosome')
      throw new Error('Autosome chromosome cannot create allosome chromatid.');
    return new Chromatid({ chromosome: this, genes, chromatidType: 'y' });
  }

  public getType(): ChromosomeType {
    return this.type;
  }

  public getTraits(): Trait[] {
    const traits = this.alleles.map(allelic => allelic.getTrait());
    return [...new Set(traits)];
  }
}
