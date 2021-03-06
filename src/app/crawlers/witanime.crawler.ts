import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class WitAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'WitAnime',
      'https://witanime.com'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      subtitles: (text: string) => {
        return 'vostar';
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
      'body > div.page-content-container:not(.content) .episodes-list-content .episodes-card-container',
      {
        anime: {
          title: '.ep-card-anime-title > h3 > a',
          cover: '.episodes-card > div > img@src',
        },
        number: '.episodes-card-title > h3 > a | number',
        streamLinks: [
          {
            url: '.episodes-card > div > a@href | decodeUrl',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
