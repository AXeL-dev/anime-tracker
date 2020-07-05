import { BaseCrawler } from './base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { today, yesterday } from '../helpers/date.helper';

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
      },
      date: (text: string) => {
        let date = text;
        if (text.indexOf('Aujourd\'hui') !== -1) {
          date = text.replace('Aujourd\'hui', today());
        } else if (text.indexOf('Hier') !== -1) {
          date = text.replace('Hier', yesterday());
        } else {
          const splittedDate = text.split(',');
          date = splittedDate[0].split('-').reverse().join('-') + splittedDate[1]; // reverse date format from dd-mm-yyyy to yyyy-mm-dd
        }
        return new Date(date.replace(',', '')).getTime();
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
          releaseDate: '.info ul.additional li.type:first-child a | date',
        },
        this.filters
      );
      resolve(episodes);
    });
  }
}
