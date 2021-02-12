import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';
import { frenchDays, frenchMonths } from '../helpers/date.helper';

export class OtakuFrCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'OtakuFr',
      'https://otakufr.co'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text.trim().match(/(.*) (\d+) vostfr$/i);
        return title?.length ? title[1].trim() : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) vostfr$/i);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return text?.length ? text.toLowerCase().trim() : 'vostfr';
      },
      date: (text: string) => {
        let date = text.toLowerCase();
        date = date.replace(new RegExp('^(' + frenchDays.join('|') + ')', 'g'), '');
        date = date.replace(new RegExp('(' + Object.keys(frenchMonths).join('|') + ')', 'g'), month => frenchMonths[month]).trim();
        date = date.split(' ').reverse().join('-');
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
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '.section-1 > article.episode',
      {
        anime: {
          title: 'a.episode-link | title',
          cover: 'figure img@src',
        },
        number: 'a.episode-link | number',
        streamLinks: [
          {
            url: 'a.episode-link@href',
            lang: '.traduction | subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: ':prev div.title | date',
      },
      this.filters
    );
  }
}
