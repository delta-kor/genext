export function isUpperCase(str: string): boolean {
  return str[0] === str[0].toUpperCase();
}

export function toUpperCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function isLowerCase(str: string): boolean {
  return str[0] === str[0].toLowerCase();
}

export function toLowerCase(str: string): string {
  return str[0].toLowerCase() + str.slice(1);
}
