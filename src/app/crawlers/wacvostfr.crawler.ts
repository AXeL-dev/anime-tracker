import { LatestEpisodesCrawler } from './abstract/latest-episodes.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';
import { slugify } from '../helpers/string.helper';

export class WacVostfrCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'WacVostfr',
      'https://wacvostfr.com'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text.trim().match(/(.*) (–|épisode) (\d+) (vostfr|vf)(?:.*)$/i);
        return title?.length ? title[1].trim() : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);
        return num?.length ? +num[1] : +text;
      },
      cover: (text: string) => {
        const title = this.filters.title(text);
        return this.filters.concatUrl(`/imgs/animes/${slugify(title)}.jpg`);
      },
      subtitles: (text: string) => {
        const sub = text.trim().match(/(vostfr|vf)(?:.*)$/i);
        return sub?.length ? sub[1] : 'vostfr';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '#posts-list + .card.mt-4 ul > a',
      {
        anime: {
          title: ':self | title',
          cover: ':self | cover',
        },
        number: ':self | number',
        streamLinks: [
          {
            url: ':self@href | concatUrl',
            lang: ':self | subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}