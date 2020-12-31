import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { today, yesterday, dateBefore } from '../helpers/date.helper';
import { Observable, of } from 'rxjs';

export class VoirAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'Voiranime',
      'https://voiranime.to'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        return text.replace('-110x150', '');
      },
      subtitles: (text: string) => {
        return 'vostfr';
      },
      date: (text: string) => {
        if (text.indexOf('mins ago') !== -1 || text.indexOf('hours ago') !== -1) {
          return today();
        } else if (text.indexOf('1 day ago') !== -1) {
          return yesterday();
        } else {
          const matches = text.match(/(\d+) days ago/);
          if (matches?.length) {
            return dateBefore(+matches[1]);
          }
          return new Date(text)?.getTime();
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
    return this.scraper.scrape(
      `${this.baseUrl}/?filter=subbed`,
      '#loop-content .page-item-detail',
      {
        anime: {
          title: '.post-title h3 a',
          cover: 'img.img-responsive@src | cover',
        },
        number: '.chapter-item:first-child .chapter a | number',
        streamLinks: [
          {
            url: '.chapter-item:first-child .chapter a@href',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '.chapter-item:first-child .post-on | date',
      },
      this.filters
    );
  }
}
