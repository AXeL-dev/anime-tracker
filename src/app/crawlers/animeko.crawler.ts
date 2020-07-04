import { BaseCrawler } from './base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';

export class AnimeKoCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'AnimeKo',
      'https://animeko.co'
    );
    this.filters = {
      cover: (text: string) => {
        return text.replace('/small', '');
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
        `${this.baseUrl}/dernieres-sorties`,
        '.releases ul li.small-card',
        {
          title:  'h2 a',
          cover:  'img@data-src | cover',
          number: 'span.badge-number | number',
          streamLink: 'h2 a@href'
        },
        this.filters
      );
      resolve(episodes);
    });
  }
}
