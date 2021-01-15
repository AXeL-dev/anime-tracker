import { Pipe, PipeTransform } from '@angular/core';

export type UrlPipeAction = 'format' | 'encode' | 'decode' | 'encodeAndFormat' | 'decodeAndFormat';

@Pipe({
  name: 'url',
  pure: true
})
export class UrlPipe implements PipeTransform {
  constructor() { }

  public transform(value: string, action: UrlPipeAction): string {
    switch (action) {
      case 'format':
        return `url("${value}")`;
      case 'encode':
        return encodeURI(value);
      case 'decode':
        return decodeURI(value);
      case 'encodeAndFormat':
        return this.transform(this.transform(value, 'encode'), 'format');
      case 'decodeAndFormat':
        return this.transform(this.transform(value, 'decode'), 'format');
      default:
        throw new Error(`UrlPipe unable to transform url for invalid action: ${action}`);
    }
  }
}
