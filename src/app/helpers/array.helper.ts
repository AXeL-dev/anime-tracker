// Stolen from: https://stackoverflow.com/a/39000004
export const flatten = function (arr: any[], result: any[] = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

// Stolen from: https://github.com/angular/angular.js/blob/v1.8.0/src/Angular.js#L609
export function isArray(arr: any) {
  return Array.isArray(arr) || arr instanceof Array;
}
