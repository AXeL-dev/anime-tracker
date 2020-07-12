import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class AnimeKisaCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'AnimeKisa',
      'https://animekisa.tv'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return 'vosten';
      },
      url: (text: string) => {
        return `${this.baseUrl}/${text.replace(/^\//, '')}`;
      },
      date: (text: string) => {
        return +text * 1000; // convert to unix timestamp
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
      '.listAnimes > div.episode-box',
      {
        anime: {
          title: '.title-box > div',
          cover: '.image-box img@src | url',
        },
        number: '.info-box > div | number',
        streamLinks: [
          {
            url: '.episode-box-2 a.an:first-child@href | url',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '.info-box > div > time@time | date',
      },
      this.filters
    );
  }
}
