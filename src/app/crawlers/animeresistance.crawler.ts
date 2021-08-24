import { LatestEpisodesCrawler } from './abstract/latest-episodes.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { today, yesterday, dateBefore } from '../helpers/date.helper';
import { Observable } from 'rxjs';

export class AnimeResistanceCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'AnimeResistance',
      'https://animeresistance.co'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/EP. (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return 'vostfr';
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
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '.container .row .card',
      {
        anime: {
          title: 'a.title',
          cover: 'a.thumbnail-link img@src | concatUrl',
        },
        number: '.number | number',
        streamLinks: [
          {
            url: 'a.thumbnail-link@href | concatUrl',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '.published | date',
      },
      this.filters
    );
  }
}
