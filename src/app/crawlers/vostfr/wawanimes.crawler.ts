import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class WawAnimesCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('WawAnimes', 'https://wawanimes.tv');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/(.*) \(([A-Za-z]+)\)$/i, '$1');
      },
      number: (text: string) => {
        const num = text.match(/(.*) episode (\d+)/i);
        return num?.length ? +num[2] : 1;
      },
      subtitles: (text: string) => {
        const sub = text.match(/(.*) \(([A-Za-z]+)\)$/i);
        return sub?.length ? sub[2].toLowerCase() : 'vostfr';
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/liste-des-episodes/`,
      'section ul.Episodes > li',
      {
        anime: {
          title: '.Title | title',
          cover: '.Image img@src | concatProtocol',
        },
        number: '.ClB | number',
        streamLinks: [
          {
            url: 'article > a@href',
            lang: '.Title | subtitles',
          },
        ],
        releaseDate: '.Year | date',
      },
      this.filters
    );
  }
}
