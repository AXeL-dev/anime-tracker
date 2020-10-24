import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';
import { frenchMonths } from '../helpers/date.helper';

export class MangasVostfrCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'MangasVostfr',
      'https://www.mangas-vostfr.pro'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.replace('Vostfr', '').match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      title: (text: string) => {
        return text.replace('Vostfr', '').replace(/(.*) (\d+)/, '$1').trim();
      },
      subtitles: (text: string) => {
        return 'vostfr';
      },
      date: (text: string) => {
        let date = text.toLowerCase();
        date = date.replace(new RegExp('(' + Object.keys(frenchMonths).join('|') + ')', 'g'), month => frenchMonths[month]).trim();
        date = date.split(' ').reverse().join('-'); // reverse date format from dd-mm-yyyy to yyyy-mm-dd
        return new Date(date)?.getTime();
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
      `${this.baseUrl}`,
      '#content_box > article',
      {
        anime: {
          title: 'h2.title a | title',
          cover: '.featured-thumbnail img@src',
        },
        number: 'h2.title a | number',
        streamLinks: [
          {
            url: 'h2.title a@href',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '.post-info .date span | date',
      },
      this.filters
    );
  }
}
