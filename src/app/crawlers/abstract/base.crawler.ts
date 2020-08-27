import { Anime } from '../../models/anime';
import { Episode } from '../../models/episode';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { today } from 'src/app/helpers/date.helper';

interface Cache {
  animeList: Anime[],
  latestEpisodes: Episode[],
}

export abstract class BaseCrawler {
  protected _name: string;
  protected _baseUrl: string;
  protected filters: any = {};
  protected cache: Cache = {
    animeList: [],
    latestEpisodes: []
  };

  constructor(name: string, baseUrl: string) {
    this._name = name;
    this._baseUrl = baseUrl;
    this.filters = {
      number: (text: string) => {
        return +text;
      },
      boolean: (text: string) => {
        return !!text?.length;
      },
      concatUrl: (text: string) => {
        return `${this.baseUrl.replace(/\/$/, '')}/${text?.replace(/^\//, '')}`;
      },
      today: (text: string) => {
        return today();
      }
    };
  }

  get name() {
    return this._name;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    if (this.cache.animeList.length > 0 && !forcedUpdate) {
      return of(this.cache.animeList);
    }
    return this._getAnimeList().pipe(map((list: Anime[]) => {
      this.cache.animeList = list;
      return list;
    }));
  };

  getAnimeInfo(link: string): Observable<Anime> {
    return this._getAnimeInfo(link).pipe(map((info: Anime) => {
      // append link
      if (info) {
        info.link = link;
      }
      return info;
    }));
  };

  getEpisodes(link: string): Observable<Episode[]> {
    return this._getEpisodes(link);
  };

  getLatestEpisodes(forcedUpdate: boolean = false): Observable<Episode[]> {
    if (this.cache.latestEpisodes.length > 0 && !forcedUpdate) {
      return of(this.cache.latestEpisodes);
    }
    return this._getLatestEpisodes().pipe(map((episodes: Episode[]) => {
      this.cache.latestEpisodes = episodes;
      return episodes;
    }));
  };

  searchAnime(title: string): Observable<Anime[]> {
    return this._getAnimeList().pipe(map((list: Anime[]) => {
      const searched: Anime[] = list.filter((anime: Anime) => anime.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) || [];
      return searched;
    }));
  };

  protected abstract _getAnimeList(): Observable<Anime[]>;
  protected abstract _getAnimeInfo(link: string): Observable<Anime>;
  protected abstract _getEpisodes(link: string): Observable<Episode[]>;
  protected abstract _getLatestEpisodes(): Observable<Episode[]>;
}
