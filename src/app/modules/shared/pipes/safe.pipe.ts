/**
 * Stolen from: https://github.com/embarq/safe-pipe/blob/master/projects/safe-pipe/src/lib/safe-pipe.pipe.ts
 */
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeResourceUrl, SafeScript, SafeHtml, SafeUrl } from '@angular/platform-browser';

export type SafePipeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'safe',
  pure: true
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: string, type: SafePipeType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`SafePipe unable to bypass security for invalid type: ${type}`);
    }
  }
}
