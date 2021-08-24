import { LatestEpisodesCrawler } from './abstract/latest-episodes.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';
import { isNumber } from '../helpers/number.helper';

export class DarkAnimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
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

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
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
