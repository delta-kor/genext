import { Trait } from '../trait/trait';

export interface Gene {
  sign: string;
  dominance: number;
  allelic: Allelic;
}

export default class Allelic {
  private readonly genes: Gene[] = [];

  constructor(private readonly trait: Trait) {}

  public addGene(geneBase: Omit<Gene, 'allelic'>): void {
    const gene: Gene = { ...geneBase, allelic: this };
    this.genes.push(gene);
  }

  public getGenes(): Gene[] {
    return this.genes.sort((a, b) => b.dominance - a.dominance);
  }

  public getTrait(): Trait {
    return this.trait;
  }
}
