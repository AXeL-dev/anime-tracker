import { Pipe, PipeTransform } from '@angular/core';
import { ScraperService } from 'src/app/services/scraper.service';

export type ProxyPipeAction = 'resolveUrl';
export type ProxyPipeValueType = 'image';

@Pipe({
  name: 'proxy',
  pure: true,
})
export class ProxyPipe implements PipeTransform {
  constructor(protected scraper: ScraperService) {}

  private getImageOrFallback = (
    path: string,
    fallback: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
    });
  };

  async transform(
    value: string,
    action: ProxyPipeAction,
    type?: ProxyPipeValueType
  ): Promise<string> {
    switch (action) {
      case 'resolveUrl': {
        const url = this.scraper.resolveUrl(value);
        switch (type) {
          case 'image':
            return await this.getImageOrFallback(value, url);
          default:
            return url;
        }
      }
      default:
        throw new Error(
          `ProxyPipe unable to transform value for invalid action: ${action}`
        );
    }
  }
}
