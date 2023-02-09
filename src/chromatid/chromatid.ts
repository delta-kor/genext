import { Gene } from '../allelic/allelic';
import Chromosome from '../chromosome/chromosome';

interface ChromatidConfig {
  chromosome: Chromosome;
}

export default class Chromatid {
  private readonly genes: Gene[] = [];

  constructor(config: ChromatidConfig) {}
}
