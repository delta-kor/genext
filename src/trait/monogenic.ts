import Allele from '../allelic/allele';

export default class MonogenicTrait {
  private readonly allelic: Allele = new Allele(this);

  constructor(...signs: (string | string[])[]) {
    if (signs.flat(1).length < 2)
      throw new Error('Monogenic trait must have at least two signs');

    let dominance: number = signs.length;
    for (const sign of signs) {
      if (Array.isArray(sign))
        for (const item of sign)
          this.allelic.addGene({ sign: item, dominance });
      else this.allelic.addGene({ sign, dominance });

      dominance--;
    }
  }

  public getAllele(): Allele {
    return this.allelic;
  }

  public toDominanceExpression(): string {
    let result: string = '';

    const sortedGenes = this.allelic.getGenes();
    for (let i = 0; i < sortedGenes.length; i++) {
      const gene = sortedGenes[i];
      const nextGene = sortedGenes[i + 1];

      result += gene.sign;

      if (nextGene) {
        if (nextGene.dominance === gene.dominance) result += ' = ';
        else result += ' > ';
      }
    }

    return result;
  }
}

export class XLinkedMonogenicTrait extends MonogenicTrait {
  constructor(...signs: (string | string[])[]) {
    super(...signs);
  }
}

export class YLinkedMonogenicTrait extends MonogenicTrait {
  constructor(...signs: (string | string[])[]) {
    super(...signs);
  }
}
