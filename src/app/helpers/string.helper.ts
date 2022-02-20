import { compareTwoStrings } from 'string-similarity';

// Stolen from: https://github.com/lodash/lodash/blob/master/isString.js
export function isString(val: any) {
  return (
    typeof val === 'string' ||
    (!!val &&
      typeof val === 'object' &&
      Object.prototype.toString.call(val) === '[object String]')
  );
}

export function isSimilar(
  s1: string,
  s2: string,
  degree: number = 0.7,
  strict: boolean = false
) {
  const cleanedS1 = s1.toLowerCase().replace(/[-_~:,;'".]/g, '');
  const cleanedS2 = s2.toLowerCase().replace(/[-_~:,;'".]/g, '');
  return (
    cleanedS1 === cleanedS2 ||
    (!strict &&
      (cleanedS1.indexOf(cleanedS2) !== -1 ||
        cleanedS2.indexOf(cleanedS1) !== -1)) ||
    compareTwoStrings(cleanedS1, cleanedS2) >= degree
  );
}

export function slugify(text: string, specialCharsReplacement?: string) {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ&·/_,:;';
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh-------';
  const p = new RegExp(a.split('').join('|'), 'g');

  const specialCharsReplacer = specialCharsReplacement
    ? () => specialCharsReplacement
    : (c: string) => b.charAt(a.indexOf(c));

  return text
    .toString() // Cast to string
    .toLowerCase() // Convert to lowercase letters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, specialCharsReplacer) // Replace special chars
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
