
// Stolen from: https://github.com/lodash/lodash/blob/master/isString.js
export function isString(val: any) {
  return typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}

export function isSimilar(s1: string, s2: string, degree: number = 0.7, strict: boolean = false) {
  const cleanedS1 = s1.toLowerCase().replace(/[-_~:,;'".]/g, '');
  const cleanedS2 = s2.toLowerCase().replace(/[-_~:,;'".]/g, '');
  return cleanedS1 === cleanedS2 || 
         (!strict && (cleanedS1.indexOf(cleanedS2) !== -1 || cleanedS2.indexOf(cleanedS1) !== -1)) || 
         similarity(cleanedS1, cleanedS2) >= degree;
}

// Stolen from: https://stackoverflow.com/a/36566052
function similarity(s1: string, s2: string) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}
