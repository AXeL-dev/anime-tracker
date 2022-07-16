import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { frenchMonths } from 'src/app/helpers/date.helper';

export class AnimeCompletCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimeComplet', 'https://animecomplet.me', 'vostfr');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/vostfr/i, '').trim();
      },
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/i);
        return num?.length ? +num[1] : 1;
      },
      subtitles: (text: string) => {
        const sub = text.match(/Episode (?:\d+) ([A-Za-z]+)$/i);
        return sub?.length ? sub[1].toLowerCase() : 'vostfr';
      },
      date: (text: string) => {
        let date = text.toLowerCase();
        date = date
          .replace(
            new RegExp('(' + Object.keys(frenchMonths).join('|') + ')', 'g'),
            (month) => frenchMonths[month]
          )
          .trim();
        date = date.split(' ').reverse().join('-');
        return new Date(date)?.getTime();
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      'ul.recent-posts > li',
      {
        anime: {
          title: '.post-content .meta-category > a | title',
          cover: '.post-thumb img@src | concatUrl',
        },
        number: '.post-content > h2 > a | number',
        streamLinks: [
          {
            url: '.post-content > h2 > a@href',
            lang: '.post-content > h2 > a | subtitles',
          },
        ],
        releaseDate: '.post-content .meta-date | date',
      },
      this.filters
    );
  }
}
