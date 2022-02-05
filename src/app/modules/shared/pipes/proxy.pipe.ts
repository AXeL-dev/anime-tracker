import { Pipe, PipeTransform } from '@angular/core';
import { ScraperService } from 'src/app/services/scraper.service';
import { SettingsService } from 'src/app/services/settings.service';

export type ProxyPipeAction = 'resolveUrl';
export type ProxyPipeValueType = 'image';

@Pipe({
  name: 'proxy',
  pure: true,
})
export class ProxyPipe implements PipeTransform {
  constructor(
    protected settings: SettingsService,
    protected scraper: ScraperService
  ) {}

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
        switch (type) {
          case 'image':
            if (!this.settings.proxy.shouldFetchImages || !value) {
              return value;
            }
            const fallback = this.scraper.resolveUrl(value);
            return await this.getImageOrFallback(value, fallback);
          default:
            return this.scraper.resolveUrl(value);
        }
      }
      default:
        throw new Error(
          `ProxyPipe unable to transform value for invalid action: ${action}`
        );
    }
  }
}
