import Chromosome from '../chromosome/chromosome';
import Person, { Sex } from '../person/person';
import { Traits } from '../trait/trait';

export default class Scenario {
  constructor(private readonly traits: Traits) {}

  public createPerson(genotype: [string, string], sex: Sex): Person {
    genotype[0] = genotype[0].replace(/X/g, '');
    genotype[1] = genotype[1].replace(/[XY]/g, '');

    return new Person({
      traits: this.traits,
      sex,
      genotype,
    });
  }

  public cross(
    mother: Person,
    father: Person,
    ignoreAllosome: boolean = false
  ) {
    if (mother.getSex() !== 'female') throw new Error('Mother must be female');
    if (father.getSex() !== 'male') throw new Error('Father must be male');

    const motherChromosomes = mother.getHomologousChromosomes();
    const fatherChromosomes = father.getHomologousChromosomes();

    const motherGamete = this.createGamete(motherChromosomes, ignoreAllosome);
    const fatherGamete = this.createGamete(fatherChromosomes, ignoreAllosome);

    const motherGenotype = motherGamete
      .map(chromosome => chromosome.getGenes().join(''))
      .join('');
    const fatherGenotype = fatherGamete
      .map(chromosome => chromosome.getGenes().join(''))
      .join('');

    return this.createPerson(
      [motherGenotype, fatherGenotype],
      fatherGenotype.includes('Y') ? 'male' : 'female'
    );
  }

  private createGamete(
    chromosomes: [Chromosome, Chromosome][],
    ignoreAllosome: boolean
  ) {
    const gamete: Chromosome[] = [];
    for (const chromosome of chromosomes) {
      if (chromosome[0].isAllosome() && ignoreAllosome) continue;
      gamete.push(chromosome[Math.floor(Math.random() * 2)]);
    }
    return gamete;
  }
}
