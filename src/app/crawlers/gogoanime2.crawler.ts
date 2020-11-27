import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class GogoAnimeCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'GogoAnime',
      'https://www11.gogoanimehub.com'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Eps (\d+) \| (\w+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        const sub = text.match(/Eps (\d+) \| (\w+)/);
        return sub[2]?.toLowerCase() !== 'sub' ? 'English ' + sub[2] : 'vosten';
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
      `${this.baseUrl}`,
      'ul#ongoing-animes li',
      {
        anime: {
          title: 'h3',
          cover: 'img.cover@src',
        },
        number: '.type | number',
        streamLinks: [
          {
            url: 'a@href | concatUrl',
            lang: '.type | subtitles',
          }
        ],
        //subtitlesLang: '.type | subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}
