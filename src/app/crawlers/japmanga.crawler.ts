import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class JapMangaCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'JapManga',
      'https://www.japmanga.com/'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.replace('Vostfr', '').match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      title: (text: string) => {
        return text.replace('Vostfr', '').replace(/(.*) (\d+)/, '$1').trim();
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
      'div#anime-pos > .grd-grid > .grd-ceil',
      {
        anime: {
          title: '.grd-post-title a | title',
          cover: '.grd-post-thumbnail img@src',
        },
        number: '.grd-post-title a | number',
        streamLinks: [
          {
            url: '.grd-post-thumbnail a@href',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '.grd-post-date | date',
      },
      this.filters
    );
  }
}
