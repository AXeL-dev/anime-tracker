import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { today, yesterday, dateBefore } from '../helpers/date.helper';
import { Observable, of } from 'rxjs';

export class NekoSamaCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'Neko-sama',
      'https://www.neko-sama.fr'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Ep. (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return 'vostfr';
      },
      date: (text: string) => {
        if (text.indexOf('minute') !== -1 || text.indexOf('heure') !== -1) {
          return today();
        } else if (text.indexOf('il y a 1 jour') !== -1) {
          return yesterday();
        } else {
          const matches = text.match(/il y a (\d+) jours/);
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
      `${this.baseUrl}`,
      '.js-last-episode-container > div',
      {
        anime: {
          title: 'a.title .limit',
          cover: '.holder img@src',
        },
        number: 'a.title .episode | number',
        streamLinks: [
          {
            url: 'a.play@href | concatUrl',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        //releaseDate: 'span.time | date',
        releaseDate: '| today',
      },
      this.filters
    );
  }
}
