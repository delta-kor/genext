import { Trait } from '../trait/trait';

export interface Gene {
  sign: string;
  dominance: number;
}

export default class Allelic {
  private readonly genes: Gene[] = [];

  constructor(private readonly trait: Trait) {}

  public addGene(gene: Gene): void {
    this.genes.push(gene);
  }

  public getGenes(): Gene[] {
    return this.genes.sort((a, b) => b.dominance - a.dominance);
  }

  public getTrait(): Trait {
    return this.trait;
  }
}
