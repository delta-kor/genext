export interface Gene {
  sign: string;
  dominance: number;
}

export default class MonogenicTrait {
  private readonly genes: Gene[] = [];

  constructor(...signs: (string | string[])[]) {
    let dominance: number = signs.length;
    for (const sign of signs) {
      if (Array.isArray(sign))
        for (const item of sign) this.genes.push({ sign: item, dominance });
      else this.genes.push({ sign, dominance });

      dominance--;
    }
  }

  public toDominanceExpression(): string {
    let result: string = '';

    const sortedGenes = this.genes.sort((a, b) => b.dominance - a.dominance);
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
