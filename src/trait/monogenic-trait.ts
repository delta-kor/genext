export type MonogenicTraitConfig =
  | SingleAlleleMonogenicTraitConfig
  | MultiAlleleMonogenicTraitConfig;

interface SingleAlleleMonogenicTraitConfig {
  sign: string;
  dominance?: boolean;
}

interface MultiAlleleMonogenicTraitConfig {
  sign: string[];
  dominance?: number[];
}

export interface Gene {
  sign: string;
  dominance: number;
}

export class MonogenicTrait {
  private readonly genes: Gene[];

  constructor(config: MonogenicTraitConfig) {
    const sign = config.sign;

    if (typeof sign === 'string') {
      if (sign.length !== 1) throw new Error('Sign must be a single character');
      this.genes = [
        { sign: sign.toLowerCase(), dominance: 0 },
        {
          sign: sign.toUpperCase(),
          dominance: config.dominance === false ? 0 : 1,
        },
      ];
    } else {
      this.genes = sign.reverse().map((item, index) => {
        if (item.length !== 1)
          throw new Error('Sign must be a single character');
        return { sign: item, dominance: index };
      });
    }
  }

  public toDominanceExpression(): string {
    let result = '';

    const sortedGenes = this.genes.sort((a, b) => {
      if (a.dominance === b.dominance) {
        return b.sign.localeCompare(a.sign);
      }
      return b.dominance - a.dominance;
    });

    for (const index in sortedGenes) {
      const gene = this.genes[index];
      const nextGene = this.genes[Number(index) + 1];

      result += gene.sign;

      if (nextGene) {
        if (gene.dominance === nextGene.dominance) result += ' = ';
        else result += ' > ';
      }
    }

    return result;
  }
}
