import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class WitAnimeCrawler extends LatestEpisodesCrawler {

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
      },
      this.filters
    );
  }
}
