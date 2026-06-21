export function buildValidationRegex(base: number): RegExp {
  if (base < 2 || base > 36) return /(?!)/;
  if (base <= 10) return new RegExp(`^[0-${base - 1}]*$`);
  const maxLetter = String.fromCharCode(86 + base);
  return new RegExp(`^[0-9a-${maxLetter}]*$`, 'i');
}

export function isValidForBase(input: string, base: number): boolean {
  if (!input) return true;
  return buildValidationRegex(base).test(input);
}

export function convert(input: string, fromBase: number, toBase: number): string {
  if (!input) return '';
  const num = parseInt(input, fromBase);
  if (isNaN(num)) return '';
  return num.toString(toBase).toUpperCase();
}
