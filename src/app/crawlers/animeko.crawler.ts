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
        return text?.length ? parseInt(text) : text;
      },
      boolean: (text: string) => {
        return !!text?.length;
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
          animeTitle: 'h2 a',
          cover: 'img@data-src | cover',
          number: 'span.badge-number | number',
          streamLink: 'h2 a@href',
          isNew: '.badge-status.new | boolean',
          isLast: '.badge-status.end | boolean',
        },
        this.filters
      );
      resolve(episodes);
    });
  }
}
