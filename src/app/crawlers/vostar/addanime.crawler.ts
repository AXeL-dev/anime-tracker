import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class AddAnimeCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AddAnime', 'https://apk.addanime.online');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return (
          text
            // remove all arabic characters
            //.replace(/[\u0600-\u06ff\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd50-\ufd8f\ufe70-\ufefc\uFDF0-\uFDFD]+/gm, '')
            .split('|')[0]
            .trim()
        );
      },
      number: (text: string) => {
        const num = text.match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      subtitles: (text: string) => {
        return 'vostar';
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/episode`,
      'body > .container > .anime-list-content > .row > div',
      {
        anime: {
          title: '.anime-card-details > .anime-card-title@title | title',
          cover: '.anime-card-poster img@src',
        },
        number: '.anime-card-poster .episodes-card-title > h3 > a | number',
        streamLinks: [
          {
            url: '.anime-card-poster .episodes-card-title > h3 > a@href',
            lang: '| subtitles',
          },
        ],
      },
      this.filters
    );
  }
}
