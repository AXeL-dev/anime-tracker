import { Injectable } from '@angular/core';
import { ScraperService } from './scraper.service';
import { SettingsService } from './settings.service';
import {
  BaseCrawler,
  AnimeKoCrawler,
  AnimeResistanceCrawler,
  VostFreeCrawler,
  FullAnimeVFCrawler,
  VoirAnimeCrawler,
  NekoSamaCrawler,
  JapMangaCrawler,
  MangasVostfrCrawler,
  GogoAnimeCrawler,
  FourAnimeCrawler,
  AnimeKisaCrawler,
  WitAnimeCrawler,
  AnimeFourUpCrawler,
  ToonAnimeCrawler,
  VoirAnimeOrgCrawler,
  OtakuFrCrawler,
  MavAnimesCrawler,
  YugenAnimeCrawler,
  AnimixPlayCrawler,
  WacVostfrCrawler,
} from '../crawlers';

@Injectable({
  providedIn: 'root',
})
export class CrawlersService {

  private crawlers: BaseCrawler[] = [];

  constructor(private scraper: ScraperService, private settings: SettingsService) {
    // Vostfr crawlers (keep the ones that provides precise release dates on the top)
    this.add(new AnimeKoCrawler(this.scraper));
    this.add(new NekoSamaCrawler(this.scraper));
    this.add(new VoirAnimeCrawler(this.scraper));
    this.add(new VoirAnimeOrgCrawler(this.scraper));
    this.add(new MavAnimesCrawler(this.scraper));
    this.add(new AnimeResistanceCrawler(this.scraper));
    this.add(new WacVostfrCrawler(this.scraper));
    this.add(new VostFreeCrawler(this.scraper));
    this.add(new FullAnimeVFCrawler(this.scraper));
    this.add(new MangasVostfrCrawler(this.scraper));
    this.add(new OtakuFrCrawler(this.scraper));
    this.add(new JapMangaCrawler(this.scraper));
    this.add(new ToonAnimeCrawler(this.scraper));
    // Vosten crawlers
    this.add(new YugenAnimeCrawler(this.scraper));
    this.add(new AnimixPlayCrawler(this.scraper));
    this.add(new GogoAnimeCrawler(this.scraper));
    this.add(new FourAnimeCrawler(this.scraper));
    this.add(new AnimeKisaCrawler(this.scraper));
    // Vostar crawlers
    this.add(new WitAnimeCrawler(this.scraper));
    this.add(new AnimeFourUpCrawler(this.scraper));

    // Update crawlers state
    this.update();
  }

  update() {
    this.crawlers.forEach((crawler: BaseCrawler) => {
      crawler.isActive = this.settings.inactiveCrawlers.indexOf(crawler.name) === -1;
    });
  }

  add(crawler: BaseCrawler) {
    this.crawlers.push(crawler);
  }

  remove(crawler: BaseCrawler) {
    this.crawlers = this.crawlers.filter((c: BaseCrawler) => c.name !== crawler.name);
  }

  get(...names: string[]) {
    return this.crawlers.filter((c: BaseCrawler) => names.indexOf(c.name) !== -1);
  }

  getAll() {
    return this.crawlers;
  }

  getAllExcept(...names: string[]) {
    return this.crawlers.filter((c: BaseCrawler) => names.indexOf(c.name) === -1);
  }

  getActive() {
    return this.crawlers.filter((c: BaseCrawler) => c.isActive);
  }

}
