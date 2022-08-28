import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { frenchDays, frenchMonths } from '../../helpers/date.helper';
import { Observable } from 'rxjs';

export class IAnimeFrCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('IAnimeFr', 'https://ianime-fr.com', 'vostfr');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text
          .replace('VOSTFR', '')
          .replace(/(.*) Episode (\d+)/i, '$1')
          .replace(/ – $/, '');
      },
      number: (text: string) => {
        const num = text.replace('VOSTFR', '').match(/(.*) Episode (\d+)/i);
        return num?.length ? +num[2] : 1;
      },
      date: (text: string) => {
        let date = text.replace('Ajouté le ', '').toLowerCase();
        date = date.replace(
          new RegExp('^(' + frenchDays.join('|') + ')', 'g'),
          ''
        );
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
      '#main .loop > article',
      {
        anime: {
          title: 'div > a > span | title',
          cover: 'div img@src | concatUrl',
        },
        number: 'div > a > span | number',
        streamLinks: [
          {
            url: 'div > a@href',
            lang: '| subtitles',
          },
        ],
        releaseDate: '.entry-meta > span > small | date',
      },
      this.filters
    );
  }
}
