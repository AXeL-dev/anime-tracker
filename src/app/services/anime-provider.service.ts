import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/base.crawler';
import { flatten } from '../helpers/array.helper';
import { ScraperService } from './scraper.service';
import { Episode } from '../models/episode';
import { AnimeKoCrawler } from '../crawlers/animeko.crawler';
import { VostFreeCrawler } from '../crawlers/vostfree.crawler';

@Injectable({
  providedIn: 'root',
})
export class AnimeProviderService {

  private crawlers: BaseCrawler[] = [];

  constructor(private scraper: ScraperService) {
    this.addCrawler(new AnimeKoCrawler(this.scraper));
    this.addCrawler(new VostFreeCrawler(this.scraper));
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

  getLatestEpisodes(): Promise<Episode[]> {
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
