import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class AnimeFourUpCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('Anime4up', 'https://w1.anime4up.com', 'vostar');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      [
        'body > div:nth-child(6).page-content-container .episodes-list-content .episodes-card-container',
        'body > div:nth-child(8).page-content-container .episodes-list-content .episodes-card-container',
      ],
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
          },
        ],
      },
      this.filters
    );
  }
}
