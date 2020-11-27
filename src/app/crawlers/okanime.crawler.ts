import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class OkanimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'OKanime',
      'https://www.okanime.com'
    );
    this.filters = {
      ...this.filters,
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
      '.latest-episodes div#scroll-container > .item',
      {
        anime: {
          title: 'span.video-title',
          cover: '.batnie-image img@data-src | concatUrl',
        },
        number: 'span.video-subtitle span | number',
        streamLinks: [
          {
            url: 'a@href | concatUrl',
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
