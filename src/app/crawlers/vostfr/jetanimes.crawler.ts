import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { now } from 'src/app/helpers/date.helper';

export class JetAnimesCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('JetAnimes', 'https://www.jetanimes.com');
    const dateFilter = this.filters.date;
    this.filters = {
      ...this.filters,
      title: (text: string, element: HTMLElement) => {
        if (text) {
          return text;
        }
        const results = element.querySelector('.data > h3 > a');
        const href = results.getAttribute('href');
        const hrefParts = href.split('/');
        const title = hrefParts[hrefParts.length - 2]
          ?.split('-')
          .join(' ')
          .replace(/saison \d+|episode \d+/gi, '')
          .trim();
        return title ? this.filters.capitalize(title) : href;
      },
      number: (text: string, element: HTMLElement) => {
        let num = text.match(/E(\d+)/i);
        if (num?.length) {
          return +num[1];
        }
        const results = element.querySelector('.data > h3 > a');
        const href = results.getAttribute('href');
        num = href.match(/episode-(\d+)/i);
        return num?.length ? +num[1] : 1;
      },
      subtitles: (text: string) => {
        const sub = text.match(/HD ([A-Za-z]+)$/i);
        return sub?.length ? sub[1].toLowerCase() : 'vostfr';
      },
      date: (text: string) => {
        const splitted = text.split('/');
        const dateStr = splitted[1]?.replace('.', '').trim();
        return dateFilter(dateStr);
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/episodes/`,
      '#archive-content > article',
      {
        anime: {
          title: '.data .serie | title',
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
