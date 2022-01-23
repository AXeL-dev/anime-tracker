import { Injectable } from '@angular/core';
import { ScraperService } from './scraper.service';
import { SettingsService } from './settings.service';
import { BaseCrawler, crawlers } from '../crawlers';

@Injectable({
  providedIn: 'root',
})
export class CrawlersService {
  private crawlers: BaseCrawler[] = [];

  constructor(
    private scraper: ScraperService,
    private settings: SettingsService
  ) {
    for (const crawler of crawlers) {
      this.add(new crawler(this.scraper));
    }
    // Update crawlers state
    this.update();
  }

  update() {
    this.crawlers.forEach((crawler: BaseCrawler) => {
      crawler.isActive =
        this.settings.inactiveCrawlers.indexOf(crawler.name) === -1;
    });
  }

  add(crawler: BaseCrawler) {
    this.crawlers.push(crawler);
  }

  remove(crawler: BaseCrawler) {
    this.crawlers = this.crawlers.filter(
      (c: BaseCrawler) => c.name !== crawler.name
    );
  }

  get(...names: string[]) {
    return this.crawlers.filter(
      (c: BaseCrawler) => names.indexOf(c.name) !== -1
    );
  }

  getAll(forcedUpdate: boolean = false) {
    if (forcedUpdate) {
      this.update();
    }
    return this.crawlers;
  }

  getAllExcept(...names: string[]) {
    return this.crawlers.filter(
      (c: BaseCrawler) => names.indexOf(c.name) === -1
    );
  }

  getActive(forcedUpdate: boolean = false) {
    if (forcedUpdate) {
      this.update();
    }
    return this.crawlers.filter((c: BaseCrawler) => c.isActive);
  }

  get count() {
    return this.getAll().length;
  }

  get activeCount() {
    return this.getActive().length;
  }
}
