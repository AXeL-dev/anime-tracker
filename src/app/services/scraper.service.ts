import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTMLParserService } from './html-parser.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {

  constructor(private httpClient: HttpClient, private htmlParser: HTMLParserService, private settings: SettingsService) {}

  scrape(url: string, scope: string, selector: any, filters?: any): Promise<any> {
    return new Promise(resolve => {
      this.httpClient.get(`${this.settings.proxy}${url}`, { responseType: 'text' }).toPromise().then((html: string) => {
        const parsedData = this.htmlParser.parse(html, scope, selector, filters);
        resolve(parsedData);
      }).catch((e: Error) => {
        console.error(e.message);
        resolve([]);
      });
    });
  }

}
