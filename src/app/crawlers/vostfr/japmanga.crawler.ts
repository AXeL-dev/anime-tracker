import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class JapMangaCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'JapManga',
      'https://www.japmanga.com'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.replace('Vostfr', '').match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      title: (text: string) => {
        return text.replace('Vostfr', '').replace(/(.*) (\d+)/, '$1').trim();
      },
      subtitles: (text: string) => {
        return 'vostfr';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      'div#anime-pos > .grd-grid > .grd-ceil',
      {
        anime: {
          title: '.grd-post-title a | title',
          cover: '.grd-post-thumbnail img@src',
        },
        number: '.grd-post-title a | number',
        streamLinks: [
          {
            url: '.grd-post-thumbnail a@href',
            lang: '| subtitles',
          }
        ],
        releaseDate: '.grd-post-date | date',
      },
      this.filters
    );
  }
}
