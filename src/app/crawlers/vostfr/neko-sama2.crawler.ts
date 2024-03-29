import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { today, yesterday, dateBefore } from '../../helpers/date.helper';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class NekoSamaCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('Neko-sama', 'https://www.neko-sama.fr', 'vostfr');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Ep. (\d+)/);
        return toNumber(num?.length ? num[1] : text);
      },
      date: (text: string) => {
        if (text.indexOf('minute') !== -1 || text.indexOf('heure') !== -1) {
          return today();
        } else if (text.indexOf('il y a 1 jour') !== -1) {
          return yesterday();
        } else {
          const matches = text.match(/il y a (\d+) jours/);
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
      '.js-last-episode-container > div',
      {
        anime: {
          title: 'a.title .limit',
          cover: '.holder img@src',
        },
        number: 'a.title .episode | number',
        streamLinks: [
          {
            url: 'a.play@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        //releaseDate: 'span.time | date',
      },
      this.filters
    );
  }
}
