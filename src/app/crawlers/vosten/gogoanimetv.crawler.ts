import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { today, yesterday, dateBefore } from '../../helpers/date.helper';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class GogoAnimeTvCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('GogoAnimeTv', 'https://gogoanimestv.org', 'vosten');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/<.*>.*?<\/.*>/gi, '').trim();
      },
      number: (text: string) => {
        const num = text.match(/EP (\d+)/i);
        return toNumber(num?.length ? num[1] : text);
      },
      date: (text: string) => {
        if (
          text.indexOf('mins ago') !== -1 ||
          text.indexOf('hours ago') !== -1
        ) {
          return today();
        } else if (text.indexOf('1 day ago') !== -1) {
          return yesterday();
        } else {
          const matches = text.match(/(\d+) days ago/);
          if (matches?.length) {
            return dateBefore(+matches[1]);
          }
          return new Date(text)?.getTime();
        }
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '.postbody .listupd > div > article',
      {
        anime: {
          title: 'a .tt | title',
          cover: 'a img.ts-post-image@src',
        },
        number: 'a .bt .epx | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '| subtitles',
          },
        ],
        releaseDate: 'a .timeago | date',
      },
      this.filters
    );
  }
}
