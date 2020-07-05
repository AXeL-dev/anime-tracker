import { Anime } from '../models/anime';

export abstract class BaseCrawler {
  protected _name: string;
  protected _baseUrl: string;
  protected filters: any = {};
  protected animeList: Anime[] = [];

  constructor(name: string, baseUrl: string) {
    this._name = name;
    this._baseUrl = baseUrl;
    this.filters = {
      number: (text: string) => {
        return +text;
      },
      boolean: (text: string) => {
        return !!text?.length;
      }
    };
  }

  get name() {
    return this._name;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  getAnimeList(forcedUpdate: boolean = false): Promise<any> {
    return new Promise(async resolve => {
      // check if value already cached and not a forced update
      if (this.animeList.length > 0 && !forcedUpdate) {
        resolve(this.animeList);
      }

      const list = await this._getAnimeList();
      resolve(list);
    });
  };

  getAnimeInfo(link: string): Promise<any> {
    return new Promise(async resolve => {
      const info = await this._getAnimeInfo(link);
      // append link
      if (info) {
        info.link = link;
      }
      resolve(info);
    });
  };

  getEpisodes(link: string): Promise<any> {
    return new Promise(async resolve => {
      const episodes = await this._getEpisodes(link);
      resolve(episodes);
    });
  };

  getLatestEpisodes(): Promise<any> {
    return new Promise(async resolve => {
      const episodes = await this._getLatestEpisodes();
      resolve(episodes);
    });
  };

  searchAnime(title: string): Promise<any> {
    return new Promise(async resolve => {
      let source = this.animeList;
      if (source.length === 0) {
        source = await this._getAnimeList();
      }
      const searched = source.filter(anime => anime.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) || [];
      resolve(searched);
    });
  };

  protected abstract _getAnimeList(): Promise<any>;
  protected abstract _getAnimeInfo(link: string): Promise<any>;
  protected abstract _getEpisodes(link: string): Promise<any>;
  protected abstract _getLatestEpisodes(): Promise<any>;
}
