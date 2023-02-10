import { Trait } from '../trait/trait';

export interface Gene {
  sign: string;
  dominance: number;
  allele: Allele;
}

export default class Allele {
  private readonly genes: Gene[] = [];

  constructor(private readonly trait: Trait) {}

  public addGene(geneBase: Omit<Gene, 'allele'>): void {
    const gene: Gene = { ...geneBase, allele: this };
    this.genes.push(gene);
  }

  public getGenes(): Gene[] {
    return this.genes.sort((a, b) => b.dominance - a.dominance);
  }

  public getTrait(): Trait {
    return this.trait;
  }
}
