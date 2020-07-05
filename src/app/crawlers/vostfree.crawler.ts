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
      ...this.filters,
      title: (text: string) => {
        return text.replace(/ VOSTFR$/, '');
      },
      cover: (text: string) => {
        return `${this.baseUrl}/${text.replace(/^\//, '')}`;
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
          animeTitle: '.info .title | title',
          cover: '.image img@src | cover',
          number: '.alt .year b | number',
          streamLink: '.play a.link@href',
          subtitlesLang: '.quality',
          isNew: '.anime-new | boolean',
          isLast: '.anime-fin | boolean',
        },
        this.filters
      );
      resolve(episodes);
    });
  }
}
