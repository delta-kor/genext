import Allelic from '../allelic/allelic';
import { Trait } from '../trait/trait';

export type ChromosomeType = 'allosome' | 'autosome';

export interface ChromosomeConfig {
  type: ChromosomeType;
  alleles: Allelic[];
}

export default class Chromosome {
  private readonly type: ChromosomeType;
  private readonly alleles: Allelic[] = [];

  constructor(config: ChromosomeConfig) {
    this.type = config.type;
    this.alleles = config.alleles;
  }

  public getTraits(): Trait[] {
    const traits = this.alleles.map(allelic => allelic.getTrait());
    return [...new Set(traits)];
  }
}
