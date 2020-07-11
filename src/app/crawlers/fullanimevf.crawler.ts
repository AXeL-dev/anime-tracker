import { BaseCrawler } from './base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class FullAnimeVFCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'FullAnimeVF',
      'https://www.fullanimefr.com'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.replace('[NEW]', '').replace('[HD]', '').replace('VOSTFR', '').match(/(.*) Episode (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      isNew: (text: string) => {
        return text.indexOf('[NEW]') !== -1;
      },
      title: (text: string) => {
        return text.replace('[NEW]', '').replace('[HD]', '').replace('VOSTFR', '').replace(/(.*) Episode (\d+)/, '$1');
      },
      subtitles: (text: string) => {
        return 'vostfr';
      },
      date: (text: string) => {
        return new Date(text)?.getTime();
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
      `${this.baseUrl}`,
      'div.td-block-span4',
      {
        anime: {
          title: 'h3.entry-title a | title',
          cover: 'img.entry-thumb@src',
          isNew: 'h3.entry-title a | isNew',
        },
        number: 'h3.entry-title a | number',
        streamLinks: [
          {
            url: 'h3.entry-title a@href',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: 'time.entry-date@datetime | date',
      },
      this.filters
    );
  }
}
