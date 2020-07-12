import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';
import { today } from '../helpers/date.helper';

export class DarkAnimeCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'DarkAnime',
      'https://darkanime.stream'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        return +text.replace('E', '');
      },
      subtitles: (text: string) => {
        return 'vosten';
      },
      url: (text: string, element: any) => {
        const number = this.retriever.htmlParser.find(element, 'span.series-content-episode-count | number', this.filters);
        return `${this.baseUrl}/${text.replace(/^\//, '')}/episodes/${number}`;
      },
      date: (text: string) => {
        // since we don't have the release date info. let's just return today's date
        return today();
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
      `${this.baseUrl}/animes/recently-updated`,
      '.series-section .row > div.col-6',
      {
        anime: {
          title: 'h3.series-content-title',
          cover: 'img.series-poster@src',
        },
        number: 'span.series-content-episode-count | number',
        streamLinks: [
          {
            url: 'a.series-card-hyperlink@href | url',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| date',
      },
      this.filters
    );
  }
}
