import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class MavAnimesCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'MavAnimes',
      'http://www.mavanimes.co'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        return text.replace('-300x169', '');
      },
      number: (text: string) => {
        const num = text.replace('VOSTFR', '').match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      title: (text: string) => {
        return text.replace('VOSTFR', '').replace(/(.*) (\d+)/, '$1');
      },
      subtitles: (text: string) => {
        return 'vostfr';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      'div.animes-grid div.grid-item > div',
      {
        anime: {
          title: 'p | title',
          cover: 'img.wp-post-image@src,src-set,data-cfsrc | cover',
        },
        number: 'p | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '| subtitles',
          }
        ],
      },
      this.filters
    );
  }
}
