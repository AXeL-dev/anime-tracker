import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTMLParserService } from './html-parser.service';
import { Proxy } from '../models/proxy';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {

  private CORSProxies: Proxy[] = [
    {
      name: 'cors-anywhere',
      url: 'https://cors-anywhere.herokuapp.com/'
    },
    {
      name: 'YaCDN',
      url: 'https://yacdn.org/proxy/'
    },
    {
      name: 'allOrigins',
      url: 'https://api.allorigins.win/raw?url='
    },
  ];

  constructor(private httpClient: HttpClient, private htmlParser: HTMLParserService) {}

  scrape(url: string, scope: string, selector: any, filters?: any): Promise<any> {
    return new Promise(resolve => {
      this.httpClient.get(`${this.CORSProxies[0].url}${url}`, { responseType: 'text' }).toPromise().then((html: string) => {
        const parsedData = this.htmlParser.parse(html, scope, selector, filters);
        resolve(parsedData);
      }).catch((e: Error) => {
        console.error(e.message);
        resolve([]);
      });
    });
  }

}
