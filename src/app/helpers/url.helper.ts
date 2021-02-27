
// Stolen from: https://stackoverflow.com/a/901144
export function getQueryParam(name: string, url?: string) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function sanitizePath(path: string) {
  return path.replace('/^[.|\/]+/', '');
}

export function concatUrl(url: string, params: string) {
  return url + (url.indexOf('?') !== -1 ? '&' : '?') + params.replace('/^[\?|&]+/', '');
}
