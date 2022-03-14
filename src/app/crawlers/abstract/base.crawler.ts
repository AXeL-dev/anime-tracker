import { Anime } from '../../models/anime';
import { Episode } from '../../models/episode';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { now, today } from 'src/app/helpers/date.helper';
import { toNumber } from 'src/app/helpers/number.helper';
import { FilterList } from 'src/app/models/parser';
import { capitalize } from 'src/app/helpers/string.helper';

interface Cache {
  animeList: Anime[];
  latestEpisodes: Episode[];
}

export abstract class BaseCrawler {
  protected _name: string;
  protected _baseUrl: string;
  protected _isActive: boolean;
  protected filters: FilterList = {};
  protected cache: Cache = {
    animeList: [],
    latestEpisodes: [],
  };

  constructor(name: string, baseUrl: string) {
    this._name = name;
    this._baseUrl = baseUrl;
    this._isActive = true;
    this.filters = {
      number: (text: string) => {
        return toNumber(text);
      },
      boolean: (text: string) => {
        return !!text?.length;
      },
      trim: (text: string) => {
        return text.trim();
      },
      capitalize: (text: string) => {
        return capitalize(text);
      },
      decodeUrl: (text: string) => {
        return decodeURI(text);
      },
      encodeUrl: (text: string) => {
        return encodeURI(text);
      },
      concatUrl: (text: string) => {
        return /^https?:\/\//.test(text)
          ? text
          : `${this.baseUrl.replace(/\/$/, '')}/${text?.replace(/^\//, '')}`;
      },
      concatProtocol: (text: string) => {
        return /^https?:\/\//.test(text)
          ? text
          : `https://${text?.replace(/^\/+/, '')}`;
      },
      date: (text: string) => {
        const date = new Date(text)?.getTime();
        const currentDate = now().getTime();
        return date > currentDate ? currentDate : date;
      },
    };
  }

  get name() {
    return this._name;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    if (this.cache.animeList.length > 0 && !forcedUpdate) {
      return of(this.cache.animeList);
    }
    return this._getAnimeList().pipe(
      map((list: Anime[]) => {
        this.cache.animeList = list;
        return list;
      })
    );
  }

  getAnimeInfo(link: string): Observable<Anime> {
    return this._getAnimeInfo(link).pipe(
      map((info: Anime) => {
        // append link
        if (info) {
          info.link = link;
        }
        return info;
      })
    );
  }

  getEpisodes(link: string): Observable<Episode[]> {
    return this._getEpisodes(link);
  }

  getLatestEpisodes(forcedUpdate: boolean = false): Observable<Episode[]> {
    if (this.cache.latestEpisodes.length > 0 && !forcedUpdate) {
      return of(this.cache.latestEpisodes);
    }
    return this._getLatestEpisodes().pipe(
      map((episodes: Episode[]) => {
        const latestEpisodes: Episode[] = episodes.map((episode: Episode) => ({
          ...episode,
          anime: {
            ...episode.anime,
            title: episode.anime.title.trim(),
          },
          fetchingDate: new Date().getTime(),
          releaseDate: episode.releaseDate || today(),
          hasTemporaryReleaseDate: !episode.releaseDate,
        }));
        this.cache.latestEpisodes = latestEpisodes;
        return latestEpisodes;
      })
    );
  }

  searchAnime(title: string): Observable<Anime[]> {
    return this._getAnimeList().pipe(
      map((list: Anime[]) => {
        const searched: Anime[] =
          list.filter(
            (anime: Anime) =>
              anime.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
          ) || [];
        return searched;
      })
    );
  }

  protected abstract _getAnimeList(): Observable<Anime[]>;
  protected abstract _getAnimeInfo(link: string): Observable<Anime>;
  protected abstract _getEpisodes(link: string): Observable<Episode[]>;
  protected abstract _getLatestEpisodes(): Observable<Episode[]>;
}
