import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class AnimeMaxCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimeMax', 'https://anime-max.co');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text.trim().match(/(.*) (vostfr|vf)(?:.*)$/i);
        return title?.length ? title[1].trim() : text;
      },
      subtitles: (text: string) => {
        return text ? text.toLowerCase() : 'vostfr';
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/animes-vostfr/`,
      'section#grid > div > article',
      {
        anime: {
          title: '.short-title > h2 | title',
          cover: '.short-img img@src | concatUrl',
        },
        number: '.short-meta.sl-g | number',
        streamLinks: [
          {
            url: 'a.short-title@href | concatUrl',
            lang: '.b-rate > h3 > a | subtitles',
          },
        ],
      },
      this.filters
    );
  }
}
