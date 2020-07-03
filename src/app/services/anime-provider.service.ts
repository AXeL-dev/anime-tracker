import { Injectable } from '@angular/core';
import { BaseCrawler } from './crawlers/base.crawler';
import { AnimeKoCrawler } from './crawlers/animeko.crawler';
import { flatten } from '../helpers/array.helper';
import { CorsHttpClientService } from './cors-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AnimeProviderService {

  private crawlers: BaseCrawler[] = [];

  constructor(private httpClient: CorsHttpClientService) {
    this.addCrawler(new AnimeKoCrawler(this.httpClient));
  }

  addCrawler(crawler: BaseCrawler) {
    this.crawlers.push(crawler);
  }

  removeCrawler(crawler: BaseCrawler) {
    this.crawlers = this.crawlers.filter((c: BaseCrawler) => c.name !== crawler.name);
  }

  search(title: string): Promise<any> {
    return new Promise(async resolve => {
      const variousResults = await Promise.all(
        this.crawlers.map(async crawler => {
          const result = await crawler.searchAnime(title);
          return result;
        })
      );
      const results = flatten(variousResults);
      resolve(results);
    });
  }

  getLatestEpisodes() {
    return new Promise(async resolve => {
      const variousResults = await Promise.all(
        this.crawlers.map(async crawler => {
          const result = await crawler.getLatestEpisodes();
          return result;
        })
      );
      const results = flatten(variousResults);
      resolve(results);
    });
  }

}
