import { LatestEpisodesCrawler } from './abstract/latest-episodes.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';

export class ZimabdkoCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'Zimabdko',
      'https://www.zimabdko.com'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace('أوفا ', '').replace(' والأخيرة', '').replace(/(أنمي )?(.*) الحلقة (\d+)/, '$2');
      },
      number: (text: string) => {
        const num = text.replace('أوفا ', '').replace(' والأخيرة', '').match(/(أنمي )?(.*) الحلقة (\d+)/);
        return num?.length ? +num[3] : +text.match(/\d+/g)?.[0] || 1;
      },
      subtitles: (text: string) => {
        return 'vostar';
      }
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
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
