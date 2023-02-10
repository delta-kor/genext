import { Gene } from '../allelic/allele';
import Chromosome from '../chromosome/chromosome';
import {
  XLinkedMonogenicTrait,
  YLinkedMonogenicTrait,
} from '../trait/monogenic';

type ChromatidType = 'x' | 'y' | null;

interface ChromatidConfig {
  chromosome: Chromosome;
  genes: string[];
  chromatidType?: ChromatidType;
}

// noinspection SuspiciousTypeOfGuard
export default class Chromatid {
  private readonly genes: Gene[] = [];
  private readonly chromosome: Chromosome;
  private readonly chromatidType: 'x' | 'y' | null;

  constructor(config: ChromatidConfig) {
    config.chromatidType = config.chromatidType || null;

    if (config.chromatidType === 'x' || config.chromatidType === 'y') {
      if (config.chromosome.getType() !== 'allosome')
        throw new Error('X chromosome and Y chromosome must be allosome.');
    }

    if (
      config.chromosome.getType() === 'allosome' &&
      config.chromatidType === null
    )
      throw new Error("Allosome's chromatid type must be X or Y .");

    this.chromosome = config.chromosome;
    this.chromatidType = config.chromatidType || null;
    this.loadGenes(config.genes);
  }

  private loadGenes(signs: string[]) {
    let traits = this.chromosome.getTraits();
    if (this.chromatidType === 'x')
      traits = traits.filter(
        trait => !(trait instanceof YLinkedMonogenicTrait)
      );
    if (this.chromatidType === 'y')
      traits = traits.filter(
        trait => !(trait instanceof XLinkedMonogenicTrait)
      );

    if (traits.length !== signs.length)
      throw new Error(
        `Invalid number of genes. Expected ${traits.length}, but got ${signs.length}.`
      );

    for (const trait of traits) {
      const genes = trait.getAllele().getGenes();
      const gene = genes.find(gene => signs.includes(gene.sign));

      if (gene) {
        if (
          gene.allele.getTrait() instanceof XLinkedMonogenicTrait &&
          this.chromatidType !== 'x'
        )
          throw new Error(
            'X-linked monogenic trait must be used in X chromosome.'
          );

        if (
          gene.allele.getTrait() instanceof YLinkedMonogenicTrait &&
          this.chromatidType !== 'y'
        )
          throw new Error(
            'Y-linked monogenic trait must be used in Y chromosome.'
          );

        this.genes.push(gene);
      } else
        throw new Error(
          `Invalid gene sign. Expected ${genes.map(
            gene => gene.sign
          )}, but got ${signs}.`
        );
    }
  }

  public getGenes(): Gene[] {
    return this.genes;
  }
}
