import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTMLParserService } from './html-parser.service';
import { SettingsService } from './settings.service';
import { Observable, EMPTY, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { Episode } from '../models/episode';
import { CORSProxiesByName } from '../helpers/proxy.helper';
import { FilterList, Scope, SelectorList } from '../models/parser';
import { GetRequestOptions, GetRequestParameters } from '../models/scraper';

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
    scope: Scope,
    selector: SelectorList,
    filters?: FilterList
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

  getRawHTML(url: string, timeout?: number) {
    return this.get(this.resolveUrl(url), {
      responseType: 'text',
      headers: this.getRequestHeaders(),
      timeout,
    });
  }

  getJSON(url: string, timeout?: number) {
    return this.get(this.resolveUrl(url), {
      responseType: 'json',
      headers: this.getRequestHeaders(),
      timeout,
    });
  }

  private get(url: string, options?: GetRequestOptions) {
    const { timeout: requestTimeout = 30000, ...opts } = options;
    return this.httpClient.get(url, opts as GetRequestParameters[1]).pipe(
      timeout(requestTimeout),
      catchError((error: Error) => {
        const message = this.resolveError(error, url);
        console.error(message);
        //return EMPTY; // emits only complete & causes "TypeError: undefined has no properties" when converting the observable to promise with async/await
        return of(opts.responseType === 'json' ? {} : ''); // emits both next and complete
      })
    );
  }

  private resolveError(error: Error, url: string) {
    switch (error.message) {
      case 'Timeout has occurred':
        return `${error.message} for ${url}`;
      default:
        return error.message;
    }
  }

  resolveUrl(url: string): string {
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
      case '$hostname':
        return window.location.hostname;
      case '$apiKey':
        return this.settings.proxy.apiKey;
      default:
        return value;
    }
  }
}
