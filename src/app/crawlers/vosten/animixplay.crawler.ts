import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { today, yesterday, dateBefore } from '../../helpers/date.helper';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class AnimixPlayCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimixPlay', 'https://animixplay.to', 'vosten');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/EP (\d+)/);
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
      '#resultplace ul li',
      {
        anime: {
          title: 'a .details .name',
          cover: 'a img.resultimg@src',
        },
        number: 'a .details .infotext | number',
        streamLinks: [
          {
            url: 'a@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        releaseDate: 'a .timetext | date',
      },
      this.filters
    );
  }
}
