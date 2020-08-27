import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class FourAnimeCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      '4Anime',
      'https://4anime.to'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        if (text?.[0] === '/') {
          return this.filters.concatUrl(text);
        } else {
          return `${text?.replace(/^https?:\/\/49.12.133.151/g, this.baseUrl)}`;
        }
      },
      number: (text: string) => {
        const num = text.match(/\d+/g);
        return num?.length ? +num[0] : +text;
      },
      subtitles: (text: string) => {
        return 'vosten';
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
      `${this.baseUrl}/recently-added`,
      '#recently-added #headerDIV_2 > div',
      {
        anime: {
          title: 'a#headerA_7@alt',
          cover: 'img#headerIMG_6@src | cover',
        },
        number: 'a#headerA_8 | number',
        streamLinks: [
          {
            url: 'a#headerA_5@href',
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
