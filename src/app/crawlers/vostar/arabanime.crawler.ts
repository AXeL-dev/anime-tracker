import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class ArabAnimeCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('ArabAnime', 'https://www.arabanime.net', 'vostar');
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
      'section#specials > .container > .row > .col-6',
      {
        anime: {
          title: 'a.as-info@title | trim',
          cover: 'img.img-fluid@src',
        },
        number: 'a.as-info > h3 > span | number',
        streamLinks: [
          {
            url: 'a.as-info@href | concatUrl',
            lang: '| subtitles',
          },
        ],
      },
      this.filters
    );
  }
}
