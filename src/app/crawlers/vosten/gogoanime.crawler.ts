import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class GogoAnimeCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('GogoAnime', 'https://gogoanime.gg', 'vosten');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return toNumber(num?.length ? num[1] : text);
      },
      subtitles: (text: string) => {
        return text?.indexOf('ic-DUB') !== -1 ? 'dub' : 'vosten';
      },
    };
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
          },
        ],
      },
      this.filters
    );
  }
}
