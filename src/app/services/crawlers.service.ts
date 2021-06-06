import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/abstract/base.crawler';
import { ScraperService } from './scraper.service';
import { SettingsService } from './settings.service';
import { AnimeKoCrawler } from '../crawlers/animeko.crawler';
import { AnimeResistanceCrawler } from '../crawlers/animeresistance.crawler';
import { VostFreeCrawler } from '../crawlers/vostfree.crawler';
import { FullAnimeVFCrawler } from '../crawlers/fullanimevf.crawler';
import { VoirAnimeCrawler } from '../crawlers/voiranime.crawler';
import { NekoSamaCrawler } from '../crawlers/neko-sama.crawler';
import { JapMangaCrawler } from '../crawlers/japmanga.crawler';
import { MangasVostfrCrawler } from '../crawlers/mangas-vostfr.crawler';
import { GogoAnimeCrawler } from '../crawlers/gogoanime.crawler';
import { FourAnimeCrawler } from '../crawlers/4anime.crawler';
import { AnimeKisaCrawler } from '../crawlers/animekisa.crawler';
import { WitAnimeCrawler } from '../crawlers/witanime.crawler';
import { AnimeFourUpCrawler } from '../crawlers/anime4up.crawler';
import { ToonAnimeCrawler } from '../crawlers/toonanime.crawler';
import { VoirAnimeOrgCrawler } from '../crawlers/voiranimeorg.crawler';
import { OtakuFrCrawler } from '../crawlers/otakufr.crawler';
import { MavAnimesCrawler } from '../crawlers/mavanimes.crawler';

@Injectable({
  providedIn: 'root',
})
export class CrawlersService {

  private crawlers: BaseCrawler[] = [];

  constructor(private scraper: ScraperService, private settings: SettingsService) {
    // Vostfr crawlers (keep the ones that provide precise release dates on the top)
    this.add(new AnimeKoCrawler(this.scraper));
    this.add(new NekoSamaCrawler(this.scraper));
    this.add(new VoirAnimeCrawler(this.scraper));
    this.add(new VoirAnimeOrgCrawler(this.scraper));
    this.add(new MavAnimesCrawler(this.scraper));
    this.add(new AnimeResistanceCrawler(this.scraper));
    this.add(new VostFreeCrawler(this.scraper));
    this.add(new FullAnimeVFCrawler(this.scraper));
    this.add(new MangasVostfrCrawler(this.scraper));
    this.add(new OtakuFrCrawler(this.scraper));
    this.add(new JapMangaCrawler(this.scraper));
    this.add(new ToonAnimeCrawler(this.scraper));
    // Vosten crawlers
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
