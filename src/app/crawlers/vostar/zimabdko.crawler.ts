import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class ZimabdkoCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('Zimabdko', 'https://www.zimabdko.com', 'vostar');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text
          .replace('أوفا ', '')
          .replace(' والأخيرة', '')
          .replace(/(أنمي )?(.*) الحلقة (\d+)/, '$2');
      },
      number: (text: string) => {
        const num = text
          .replace('أوفا ', '')
          .replace(' والأخيرة', '')
          .match(/(أنمي )?(.*) الحلقة (\d+)/);
        return toNumber(num?.length ? num[3] : text.match(/\d+/g)?.[0]);
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/episodes/`,
      '.wrap-latest-episodes > div.one-poster',
      {
        anime: {
          title: 'h2 | title',
          cover: 'img@src',
        },
        number: 'h2 | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '| subtitles',
          },
        ],
      },
      this.filters
    );
  }
}
