import { Pipe, PipeTransform } from '@angular/core';

export type UrlPipeAction = 'encode' | 'decode';

@Pipe({
  name: 'url',
  pure: true
})
export class UrlPipe implements PipeTransform {
  constructor() { }

  public transform(value: string, action: UrlPipeAction): string {
    switch (action) {
      case 'encode':
        return encodeURI(value);
      case 'decode':
        return decodeURI(value);
      default:
        throw new Error(`UrlPipe unable to transform url for invalid action: ${action}`);
    }
  }
}
