import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTMLParserService } from './html-parser.service';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {

  constructor(private httpClient: HttpClient, private htmlParser: HTMLParserService, private settings: SettingsService) {}

  scrape(url: string, scope: string, selector: any, filters?: any): Observable<Episode[]> {
    return this.httpClient.get(`${this.settings.proxy}${url}`, { responseType: 'text' }).pipe(map((html: string) => {
      const parsedData = this.htmlParser.parse(html, scope, selector, filters);
      return parsedData;
    }));
  }

}
