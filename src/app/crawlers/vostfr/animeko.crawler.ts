import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import {
  today,
  yesterday,
  frenchDays,
  frenchMonths,
} from '../../helpers/date.helper';
import { Observable } from 'rxjs';

export class AnimeKoCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimeKo', 'https://animeko.co', 'vostfr');
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        const cover = text.replace('/small', '');
        return this.filters.concatUrl(cover);
      },
      date: (text: string) => {
        let date = text.toLowerCase();
        if (date.indexOf("aujourd'hui") !== -1) {
          return today();
        } else if (date.indexOf('hier') !== -1) {
          return yesterday();
        } else {
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
        }
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/dernieres-sorties`,
      '.releases ul li.small-card',
      {
        anime: {
          title: 'h2 a',
          cover: 'img@data-src | cover',
          isNew: '.badge-status.new | boolean',
          isFinished: '.badge-status.end | boolean',
          isMovie: '.badge-type.movie | boolean',
        },
        number: 'span.badge-number | number',
        streamLinks: [
          {
            url: 'h2 a@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        releaseDate: ':prev div .untitle | date',
      },
      this.filters
    );
  }
}
