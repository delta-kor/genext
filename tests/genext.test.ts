import { describe, expect, test } from '@jest/globals';
import { MonogenicTrait } from '../src';
import Person from '../src/person/person';
import Scenario from '../src/scenario/scenario';

describe('single allele monogenic trait', () => {
  test('complete dominance (A > a)', () => {
    const trait = new MonogenicTrait({ sign: 'A' });
    expect(trait.toDominanceExpression()).toBe('A > a');
  });

  test('incomplete dominance (A = a)', () => {
    const trait = new MonogenicTrait({ sign: 'A', dominance: false });
    expect(trait.toDominanceExpression()).toBe('A = a');
  });
});

describe('multiple allele monogenic trait', () => {
  test('complete dominance (A > B > C)', () => {
    const trait = new MonogenicTrait({ sign: ['A', 'B', 'C'] });
    expect(trait.toDominanceExpression()).toBe('A > B > C');
  });

  test('incomplete dominance (A > B = C)', () => {
    const trait = new MonogenicTrait({
      sign: ['A', 'B', 'C'],
      dominance: [1, 1, 0],
    });
    expect(trait.toDominanceExpression()).toBe('A = B > C');
  });

  test('incomplete dominance (A = B > C)', () => {
    const trait = new MonogenicTrait({
      sign: ['A', 'B', 'C'],
      dominance: [1, 1, 0],
    });
    expect(trait.toDominanceExpression()).toBe('A = B > C');
  });

  test('incomplete dominance (A = B = C)', () => {
    const trait = new MonogenicTrait({
      sign: ['A', 'B', 'C'],
      dominance: [0, 0, 0],
    });
    expect(trait.toDominanceExpression()).toBe('A = B = C');
  });
});

describe('person', () => {
  test('1 monogenic trait (male)', () => {
    const trait = new MonogenicTrait({ sign: 'A' });
    const person = new Person({
      traits: [trait],
      sex: 'male',
      genotype: ['A', 'a'],
    });
    expect(person.toGenotypeExpression()).toBe('A/a X/Y');
  });

  test('1 monogenic trait (female)', () => {
    const trait = new MonogenicTrait({ sign: 'A' });
    const person = new Person({
      traits: [trait],
      sex: 'female',
      genotype: ['A', 'a'],
    });
    expect(person.toGenotypeExpression()).toBe('A/a X/X');
  });

  test('1 monogenic X chromosome linked trait', () => {
    const trait = new MonogenicTrait({ sign: 'A', chromosome: 'X' });
    const person = new Person({
      traits: [trait],
      sex: 'male',
      genotype: ['A', 'a'],
    });
    expect(person.toGenotypeExpression()).toBe('A/a');
  });

  test('1 monogenic Y chromosome linked trait', () => {
    const trait = new MonogenicTrait({ sign: 'A', chromosome: 'Y' });
    const person = new Person({
      traits: [trait],
      sex: 'male',
      genotype: ['_', 'a'],
    });
    expect(person.toGenotypeExpression()).toBe('X/a');
  });

  test('2 monogenic trait', () => {
    const traitA = new MonogenicTrait({ sign: 'A' });
    const traitB = new MonogenicTrait({ sign: 'B' });

    const person = new Person({
      traits: [traitA, traitB],
      sex: 'male',
      genotype: ['AB', 'ab'],
    });
    expect(person.toGenotypeExpression()).toBe('A/a B/b X/Y');
  });

  test('2 monogenic linked trait', () => {
    const traitA = new MonogenicTrait({ sign: 'A', chromosome: 1 });
    const traitB = new MonogenicTrait({ sign: 'B', chromosome: 1 });

    const person = new Person({
      traits: [traitA, traitB],
      sex: 'male',
      genotype: ['AB', 'ab'],
    });
    expect(person.toGenotypeExpression()).toBe('AB/ab X/Y');
  });

  test('2 monogenic multiple allele dominance trait', () => {
    const traitA = new MonogenicTrait({ sign: ['A', 'B', 'C'] });
    const traitB = new MonogenicTrait({ sign: 'D' });

    const person = new Person({
      traits: [traitA, traitB],
      sex: 'male',
      genotype: ['Ad', 'CD'],
    });
    expect(person.toGenotypeExpression()).toBe('A/C d/D X/Y');
  });
});

describe('scenario', () => {
  test('1 monogenic trait', () => {
    const scenario = new Scenario([new MonogenicTrait({ sign: 'A' })]);

    const mother = scenario.createPerson(['A', 'a'], 'female');
    const father = scenario.createPerson(['A', 'a'], 'male');

    for (let i = 0; i < 10; i++) {
      console.log(scenario.cross(mother, father).toGenotypeExpression());
    }
  });
});
