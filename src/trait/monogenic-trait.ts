import { isLowerCase, isUpperCase } from '../util/utils';

export type MonogenicTraitConfig =
  | SingleAlleleMonogenicTraitConfig
  | MultipleAlleleMonogenicTraitConfig;

interface SingleAlleleMonogenicTraitConfig {
  sign: string;
  dominance?: boolean;
}

interface MultipleAlleleMonogenicTraitConfig {
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
    if (typeof config.sign === 'string') {
      const sign = config.sign as string;
      const dominance = config.dominance as boolean | undefined;

      if (sign.length !== 1) throw new Error('Sign must be a single character');

      this.genes = [
        { sign: sign.toLowerCase(), dominance: 0 },
        {
          sign: sign.toUpperCase(),
          dominance: dominance === false ? 0 : 1,
        },
      ];
    } else {
      const sign = config.sign as string[];
      const dominance = config.dominance as number[] | undefined;

      const reversed = sign.reverse();
      if (dominance && dominance.length !== reversed.length)
        throw new Error(
          'Dominance array must have the same length as sign array'
        );

      this.genes = reversed.map((item, index) => {
        if (item.length !== 1)
          throw new Error('Sign must be a single character');

        return {
          sign: item,
          dominance: (dominance && dominance.reverse()[index]) ?? index,
        };
      });
    }
  }

  public toDominanceExpression(): string {
    let result = '';

    const sortedGenes = this.genes.sort((a, b) => {
      if (a.dominance === b.dominance) {
        if (isUpperCase(a.sign) && isLowerCase(b.sign)) return -1;
        return a.sign.localeCompare(b.sign);
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
