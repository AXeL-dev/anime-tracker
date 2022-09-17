import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { today, yesterday, dateBefore } from '../../helpers/date.helper';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class BanAnimesCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('BanAnimes', 'https://bananimes.com', 'vostfr');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return toNumber(num?.length ? num[1] : text);
      },
      cover: (text: string) => {
        return text.replace('-110x150', '');
      },
      date: (text: string) => {
        if (
          text.indexOf('mins ago') !== -1 ||
          text.indexOf('hours ago') !== -1 ||
          text.indexOf('heures ago') !== -1 ||
          text.indexOf('minutes ago') !== -1
        ) {
          return today();
        } else if (
          text.indexOf('1 day ago') !== -1 ||
          text.indexOf('1 jour ago') !== -1
        ) {
          return yesterday();
        } else {
          const matches = text.match(/(\d+) (?:days|jours) ago/);
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
      `${this.baseUrl}/?filter=VOSTFR`,
      '#loop-content .page-item-detail',
      {
        anime: {
          title: '.post-title h3 a',
          cover: 'img.img-responsive@data-src,src | cover',
        },
        number: '.chapter-item:first-child .chapter a | number',
        streamLinks: [
          {
            url: [
              '.chapter-item:first-child .chapter a@href',
              '.post-title h3 a@href',
            ],
            lang: '| subtitles',
          },
        ],
        releaseDate: '.chapter-item:first-child .post-on | date',
      },
      this.filters
    );
  }
}
