import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { today, yesterday, dateBefore } from '../helpers/date.helper';
import { Observable, of } from 'rxjs';

export class YugenAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'YugenAnime',
      'https://yugenani.me'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        const img = text.trim().match(/this\.src='(.*)'$/i);
        return img?.length ? img[1] : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) (?:.*)$/i);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return 'vosten';
      },
      date: (text: string) => {
        const date = text.split('—')[1]?.replace('&nbsp;', ' ').trim();
        if (date.indexOf('mins ago') !== -1 || date.indexOf('hours ago') !== -1) {
          return today();
        } else if (date.indexOf('1 day ago') !== -1) {
          return yesterday();
        } else {
          const matches = date.match(/(\d+) days ago/);
          if (matches?.length) {
            return dateBefore(+matches[1]);
          }
          return new Date(date)?.getTime();
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
      `${this.baseUrl}/latest`,
      '#wrapper ul li.ep-card',
      {
        anime: {
          title: 'a.ep-details .ep-origin-name',
          cover: 'a.ep-thumbnail img@onerror,data-src,src | cover',
        },
        number: 'a.ep-title | number',
        streamLinks: [
          {
            url: 'a.ep-thumbnail@href | concatUrl',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: 'a.ep-details .ep-statistics | date',
      },
      this.filters
    );
  }
}
