export type ChromosomeType = number | symbol | 'X' | 'Y';

export const allosome = Symbol('allosome');

export interface ChromosomeConfig {
  number: number | symbol;
  genes: string[];
}

export default class Chromosome {
  private readonly number: number | symbol;
  private readonly genes: string[];

  constructor(config: ChromosomeConfig) {
    this.number = config.number;
    this.genes = config.genes;
  }

  public getNumber(): number | symbol {
    return this.number;
  }

  public getGenes(): string[] {
    return this.genes;
  }

  public isAllosome(): boolean {
    return this.number === allosome;
  }
}
