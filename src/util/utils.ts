import util from 'util';

export function isUpperCase(str: string): boolean {
  return str[0] === str[0].toUpperCase();
}

export function isLowerCase(str: string): boolean {
  return str[0] === str[0].toLowerCase();
}

export function log(object: any): void {
  console.log(util.inspect(object, { depth: null }));
}
