import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';
import { isNumber } from '../helpers/number.helper';

export class DarkAnimeCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'DarkAnime',
      'https://app.darkanime.stream'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.replace('E', '');
        return isNumber(num) ? +num : '?';
      },
      subtitles: (text: string) => {
        return text?.indexOf('DUB') !== -1 ? 'dub' : 'vosten';
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
      `${this.baseUrl}/updated-animes`,
      '.flex.flex-wrap.-mx-2 > div',
      {
        anime: {
          title: '.anime-list-filter-bottom h3',
          cover: 'img@src',
        },
        number: '.anime-list-filter-top > span | number',
        streamLinks: [
          {
            // it's sad that we cannot get a direct link to the episode..
            url: 'a.anime-hyperlink@href | concatUrl',
            lang: '.anime-list-filter-top > div > span | subtitles',
          }
        ],
        //subtitlesLang: '.anime-list-filter-top > div > span | subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
