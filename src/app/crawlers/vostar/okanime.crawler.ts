import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class OkanimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'OKanime',
      'https://okanime.tv'
    );
    this.filters = {
      ...this.filters,
      subtitles: (text: string) => {
        return 'vostar';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/dashboard/newest_episodes`,
      '.latest-episodes > div.row > .item',
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
