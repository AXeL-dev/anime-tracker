import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class ToonAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'ToonAnime',
      'https://wvvw.toonanime.co'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/vostfr/i, '').trim();
      },
      number: (text: string) => {
        const num = text.match(/EP (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return text?.length ? text.toLowerCase().trim() : 'vostfr';
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
    return this.scraper.scrape(
      `${this.baseUrl}/anime-vostfr/`,
      '#dle-content > article',
      {
        anime: {
          title: 'footer > div.short__story-title | title',
          cover: 'img@data-src,src',
        },
        number: '.progress__box > div | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '.label__rate | subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
