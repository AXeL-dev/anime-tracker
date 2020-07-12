import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class ZimabdkoCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'Zimabdko',
      'https://www.zimabdko.com'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace('أوفا ', '').replace(' والأخيرة', '').replace(/(أنمي )?(.*) الحلقة (\d+)/, '$2');
      },
      number: (text: string) => {
        const num = text.replace('أوفا ', '').replace(' والأخيرة', '').match(/(أنمي )?(.*) الحلقة (\d+)/);
        return num?.length ? +num[3] : +text.match(/\d+/g)?.[0] || 1;
      },
      subtitles: (text: string) => {
        return 'vostar';
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    // ToDo
    return of([]);
  }

  _getAnimeInfo(link: string): Observable<Anime> {
    // ToDo
    return of();
  }

  _getEpisodes(link: string): Observable<Episode[]> {
    // ToDo
    return of([]);
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.retriever.scrape(
      `${this.baseUrl}/episodes/`,
      '.wrap-latest-episodes > div.one-poster',
      {
        anime: {
          title: 'h2 | title',
          cover: 'img@src',
        },
        number: 'h2 | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
