import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { today, yesterday } from '../helpers/date.helper';
import { Observable, of } from 'rxjs';

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
        return this.filters.concatUrl(text);
      },
      date: (text: string) => {
        let date = text.toLowerCase();
        if (date.indexOf('aujourd\'hui') !== -1) {
          return today();
        } else if (date.indexOf('hier') !== -1) {
          return yesterday();
        } else {
          const splittedDate = date.split(',');
          date = splittedDate[0].split('-').reverse().join('-') + splittedDate[1]; // reverse date format from dd-mm-yyyy to yyyy-mm-dd
          return new Date(date.replace(',', ''))?.getTime();
        }
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    // ToDo
    return of([]);
  }

  _getAnimeInfo(link: string): Observable<Anime> {
    // ToDo
    return of();
  }

  _getEpisodes(link: string): Observable<Episode[]> {
    // ToDo
    return of([]);
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.retriever.scrape(
      `${this.baseUrl}/animes-vostfr`,
      '#content div.movie-poster',
      {
        anime: {
          title: '.info .title | title',
          cover: '.image img@src,data-cfsrc | cover',
          isNew: '.anime-new | boolean',
          isFinished: '.anime-fin | boolean',
        },
        number: '.alt .year b | number',
        streamLinks: [
          {
            url: '.play a.link@href',
            lang: '.quality',
          }
        ],
        //subtitlesLang: '.quality',
        releaseDate: '.info ul.additional li.type:first-child a | date',
      },
      this.filters
    );
  }
}
