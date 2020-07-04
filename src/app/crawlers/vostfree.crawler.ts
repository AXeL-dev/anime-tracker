import { BaseCrawler } from './base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';

export class VostFreeCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'VostFree',
      'https://vostfree.com'
    );
    this.filters = {
      cover: (text: string) => {
        return `${this.baseUrl}/${text.replace(/^\//, '')}`;
      },
      number: (text: string) => {
        return parseInt(text);
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getAnimeInfo(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getEpisodes(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getLatestEpisodes(): Promise<Episode[]> {
    return new Promise(async resolve => {
      const episodes: Episode[] = await this.retriever.scrape(
        `${this.baseUrl}/animes-vostfr`,
        '#content div.movie-poster',
        {
          title:  '.info .title',
          cover:  '.image img@src | cover',
          number: '.alt .year b | number',
          streamLink: '.play a.link@href',
          subtitlesLang: '.quality',
        },
        this.filters
      );
      resolve(episodes);
    });
  }
}
