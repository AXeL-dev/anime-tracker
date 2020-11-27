import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class GogoAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'GogoAnime',
      'https://www19.gogoanime.io'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return text?.indexOf('ic-DUB') !== -1 ? 'dub' : 'vosten';
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
      '.last_episodes ul li',
      {
        anime: {
          title: 'p.name a',
          cover: 'div.img img@src',
        },
        number: 'p.episode | number',
        streamLinks: [
          {
            url: 'p.name a@href | concatUrl',
            lang: '.type@class | subtitles',
          }
        ],
        //subtitlesLang: '.type@class | subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
