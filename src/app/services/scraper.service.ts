import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTMLParserService } from './html-parser.service';
import { SettingsService } from './settings.service';
import { Observable, EMPTY, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { Episode } from '../models/episode';
import { CORSProxiesByName } from '../helpers/proxy.helper';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {
  constructor(
    private httpClient: HttpClient,
    public htmlParser: HTMLParserService,
    private settings: SettingsService
  ) {}

  get proxy() {
    return CORSProxiesByName[this.settings.proxy.name];
  }

  scrape(
    url: string,
    scope: string,
    selector: any,
    filters?: any
  ): Observable<Episode[]> {
    return this.getRawHTML(url).pipe(
      map((html: string) => {
        const parsedData = this.htmlParser.parse(
          html,
          scope,
          selector,
          filters
        );
        return parsedData;
      })
    );
  }

  getRawHTML(url: string, requestTimeout: number = 30000) {
    return this.httpClient
      .get(this.resolveUrl(url), {
        responseType: 'text',
        headers: this.getRequestHeaders(),
      })
      .pipe(
        timeout(requestTimeout),
        catchError((error: Error) => {
          console.error(error.message);
          //return EMPTY; // emits only complete & causes "TypeError: undefined has no properties" when converting the observable to promise with async/await
          return of(''); // emits both next and complete
        })
      );
  }

  private resolveUrl(url: string): string {
    return this.settings.proxy.enabled ? `${this.proxy.url}${url}` : url;
  }

  private getRequestHeaders() {
    const proxyHeaders = this.settings.proxy.enabled
      ? this.proxy.headers
      : null;
    return proxyHeaders
      ? Object.keys(proxyHeaders).reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.resolveHeaderValue(proxyHeaders[key]),
          }),
          {}
        )
      : {};
  }

  private resolveHeaderValue(value: string) {
    switch (value) {
      case '$hotsname':
        return window.location.hostname;
      case '$apiKey':
        return this.settings.proxy.apiKey;
      default:
        return value;
    }
  }
}
