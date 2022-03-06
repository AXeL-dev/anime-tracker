import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { now } from 'src/app/helpers/date.helper';

export class VostAnimezCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('VostAnimez', 'https://vostanimez.com');
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
      date: (text: string) => {
        const date = new Date(text)?.getTime();
        const currentDate = now().getTime();
        return date > currentDate ? currentDate : date;
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
