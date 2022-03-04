import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { now } from 'src/app/helpers/date.helper';

export class JetAnimesCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('JetAnimes', 'https://www.jetanimes.com');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text;
      },
      number: (text: string) => {
        const num = text.match(/E(\d+)/i);
        return num?.length ? +num[1] : 1;
      },
      subtitles: (text: string) => {
        const sub = text.match(/HD (\w+)$/i);
        return sub?.length ? sub[1].toLowerCase() : 'vostfr';
      },
      date: (text: string) => {
        const splitted = text.split('/');
        const dateStr = splitted[1]?.replace('.', '').trim();
        const date = new Date(dateStr)?.getTime();
        const currentDate = now().getTime();
        return date > currentDate ? currentDate : date;
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/episodes/`,
      '#archive-content > article',
      {
        anime: {
          title: '.data .serie',
          cover: '.poster img@src',
        },
        number: '.data > span:first-of-type | number',
        streamLinks: [
          {
            url: '.data > h3 > a@href',
            lang: '.poster .quality | subtitles',
          },
        ],
        releaseDate: '.data > span:first-of-type | date',
      },
      this.filters
    );
  }
}
