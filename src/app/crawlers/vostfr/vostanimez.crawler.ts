import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class VostAnimezCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('VostAnimez', 'https://vostanimez.com');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/(.*) \((\w+)\)$/i, '$1');
      },
      number: (text: string) => {
        const num = text.match(/(.*) episode (\d+)/i);
        return num?.length ? +num[2] : 1;
      },
      subtitles: (text: string) => {
        const sub = text.match(/(.*) \((\w+)\)$/i);
        return sub?.length ? sub[2].toLowerCase() : 'vostfr';
      },
      date: (text: string) => {
        return new Date(text)?.getTime();
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
