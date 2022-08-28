import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { today, yesterday, dateBefore } from '../../helpers/date.helper';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class AnimeDaoCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimeDao', 'https://animedao.to', 'vosten');
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
      'div#new > div',
      {
        anime: {
          title: 'div.latestanime-title > a@title | title',
          cover: 'div.latestepisode_image img@data-src,src | concatUrl',
        },
        number: 'div.latestanime-title > a@title | number',
        streamLinks: [
          {
            url: 'div.latestanime-title a@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        releaseDate: 'span.front_time | date',
      },
      this.filters
    );
  }
}
