export type ChromosomeType = number | symbol | 'X' | 'Y';

export const allosome = Symbol('allosome');

export interface ChromosomeConfig {
  number: ChromosomeType;
  genes: string[];
}

export default class Chromosome {
  private readonly number: ChromosomeType;
  private readonly genes: string[];

  constructor(config: ChromosomeConfig) {
    if (config.number === allosome) throw new Error('Allosome must be X or Y');
    this.number = config.number;
    this.genes = config.genes;
  }

  public getNumber(): string | symbol {
    return this.isAllosome() ? allosome : (this.number as any);
  }

  public getGenes(): string[] {
    return this.genes;
  }

  public isAllosome(): boolean {
    return this.number === 'X' || this.number === 'Y';
  }
}
