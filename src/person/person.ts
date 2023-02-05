import Chromosome, { allosome, ChromosomeType } from '../chromosome/chromosome';
import { Traits } from '../trait/trait';
import ArrayMap from '../util/arraymap';

export type Sex = 'male' | 'female';

export interface PersonConfig {
  traits: Traits;
  sex: Sex;
  genotype: [string, string];
}

export default class Person {
  private readonly traits: Traits;
  private readonly sex: Sex;
  private readonly motherChromosomes: Chromosome[] = [];
  private readonly fatherChromosomes: Chromosome[] = [];
  constructor(config: PersonConfig) {
    this.traits = config.traits;
    this.sex = config.sex;
    this.loadChromosomes(config.genotype);
  }

  private loadChromosomes(genoType: [string, string]): void {
    const motherGenotype = genoType[0];
    const fatherGenotype = genoType[1];

    const motherGenes = new ArrayMap<ChromosomeType, string>();
    const fatherGenes = new ArrayMap<ChromosomeType, string>();

    if (motherGenotype.length !== fatherGenotype.length)
      throw new Error('Genotype length mismatch');
    if (motherGenotype.length !== this.traits.length)
      throw new Error('Genotype & trait length mismatch');

    const alleles: string[] = [];
    for (let i = 0; i < motherGenotype.length; i++) {
      for (const allele of alleles) {
        if (
          allele.includes(motherGenotype[i]) ||
          allele.includes(fatherGenotype[i])
        )
          throw new Error('Allele duplication');
      }
      alleles.push(motherGenotype[i] + fatherGenotype[i]);
    }

    for (const allele of alleles) {
      for (const trait of this.traits) {
        const traitChromosomeType = trait.getChromosome();
        const geneSigns = trait.getGeneSigns();

        const traitHasMotherGene = geneSigns.includes(allele[0]);
        const traitHasFatherGene = geneSigns.includes(allele[1]);

        if (!traitHasMotherGene && !traitHasFatherGene) continue;
        if (traitHasMotherGene && !traitHasFatherGene)
          throw new Error('Genotypes do not match (father)');
        if (
          !traitHasMotherGene &&
          traitHasFatherGene &&
          traitChromosomeType !== 'Y'
        )
          throw new Error('Genotypes do not match (mother)');
        if (traitChromosomeType === 'Y' && allele[0] !== '_')
          throw new Error('Mother cannot have Y chromosome traits');

        if (traitChromosomeType === 'X') {
          motherGenes.add('X', allele[0]);
          fatherGenes.add('Y', allele[1]);
        } else if (traitChromosomeType === 'Y') fatherGenes.add('Y', allele[1]);
        else {
          motherGenes.add(traitChromosomeType, allele[0]);
          fatherGenes.add(traitChromosomeType, allele[1]);
        }
      }
    }

    motherGenes.getAll().forEach(gene => {
      const number = gene[0];
      const genes = gene[1];
      this.motherChromosomes.push(new Chromosome({ number, genes }));
    });

    fatherGenes.getAll().forEach(gene => {
      const number = gene[0];
      const genes = gene[1];
      this.fatherChromosomes.push(new Chromosome({ number, genes }));
    });

    if (!this.motherChromosomes.find(item => item.isAllosome())) {
      this.motherChromosomes.push(
        new Chromosome({ number: 'X', genes: ['X'] })
      );
    }

    if (!this.fatherChromosomes.find(item => item.isAllosome())) {
      this.fatherChromosomes.push(
        new Chromosome({
          number: this.sex === 'male' ? 'Y' : 'X',
          genes: [this.sex === 'male' ? 'Y' : 'X'],
        })
      );
    }
  }

  public getSex(): Sex {
    return this.sex;
  }

  public getHomologousChromosomes(): [Chromosome, Chromosome][] {
    const result: [Chromosome, Chromosome][] = [];

    for (const motherChromosome of this.motherChromosomes) {
      const number = motherChromosome.getNumber();
      const fatherChromosome = this.fatherChromosomes.find(
        chromosome => chromosome.getNumber() === number
      );

      if (!fatherChromosome) throw new Error('Father chromosome not found');
      result.push([motherChromosome, fatherChromosome]);
    }

    return result;
  }

  public toGenotypeExpression(): string {
    let result: string[] = [];

    for (const motherChromosome of this.motherChromosomes) {
      const number = motherChromosome.getNumber();
      const fatherChromosome = this.fatherChromosomes.find(
        chromosome => chromosome.getNumber() === number
      );

      if (!fatherChromosome) throw new Error('Father chromosome not found');
      const motherGenes = motherChromosome.getGenes();
      const fatherGenes = fatherChromosome.getGenes();

      if (number === allosome)
        result.push(
          `${motherGenes.join('') || '_'}/${fatherGenes.join('') || '_'}`
        );
      else result.push(`${motherGenes.join('')}/${fatherGenes.join('')}`);
    }

    return result.join(' ');
  }
}
