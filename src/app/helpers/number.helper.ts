export function isNumber(value: string) {
  return !isNaN(+value);
}

export function toNumber(value: string, defaultValue: number = 1) {
  return +value || defaultValue;
}
