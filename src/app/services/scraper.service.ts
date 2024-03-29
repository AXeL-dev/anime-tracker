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
import { ExtraProxyData } from '../models/proxy';
import { objectToQueryString } from '../helpers/url.helper';

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
    return this.getResponse(url).pipe(
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

  private getResponse(url: string) {
    if (!this.settings.proxy.enabled) {
      return this.getRawHTML(url);
    }
    const observable =
      this.proxy.options?.responseType === 'json'
        ? this.getJSON(url)
        : this.getRawHTML(url);
    return this.proxy.options?.responseParser
      ? observable.pipe(map(this.proxy.options.responseParser))
      : observable;
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
    if (!this.settings.proxy.enabled) {
      return url;
    }
    const params = this.getRequestParams({ url });
    const queryString = objectToQueryString(
      params,
      this.proxy.options?.paramsEncoding?.enabled ?? true
    );
    return `${this.proxy.url}${queryString || url}`;
  }

  private getRequestParams(extra: ExtraProxyData) {
    const proxyParams = this.settings.proxy.enabled ? this.proxy.params : null;
    return proxyParams
      ? Object.keys(proxyParams).reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.resolveValue(proxyParams[key], extra),
          }),
          {}
        )
      : {};
  }

  private getRequestHeaders() {
    const proxyHeaders = this.settings.proxy.enabled
      ? this.proxy.headers
      : null;
    return proxyHeaders
      ? Object.keys(proxyHeaders).reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.resolveValue(proxyHeaders[key]),
          }),
          {}
        )
      : {};
  }

  private resolveValue(value: string, extra?: ExtraProxyData) {
    switch (value) {
      case '$url':
        return extra?.url || value;
      case '$hostname':
        return window.location.hostname;
      case '$apiKey':
        return this.settings.proxy.apiKey;
      default:
        return value;
    }
  }
}
