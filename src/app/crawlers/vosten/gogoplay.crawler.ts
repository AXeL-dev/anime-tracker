import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { dateBefore, today, yesterday } from 'src/app/helpers/date.helper';
import { toNumber } from 'src/app/helpers/number.helper';

export class GogoPlayCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('GogoPlay', 'https://gogoplay1.com/');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text.match(/(.*) Episode (\d+)/);
        return title?.length ? title[1].trim() : text;
      },
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return toNumber(num?.length ? num[1] : text);
      },
      subtitles: (text: string) => {
        return 'vosten';
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
      'ul.listing.items > li',
      {
        anime: {
          title: '.name | title',
          cover: '.picture img@src',
        },
        number: '.name | number',
        streamLinks: [
          {
            url: 'a@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        releaseDate: '.meta > .date | date',
      },
      this.filters
    );
  }
}
