
// Stolen from: https://github.com/lodash/lodash/blob/master/isString.js
export function isString(val: any) {
  return typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}
