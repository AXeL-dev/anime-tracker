import { Anime } from './anime';

export interface Episode {
  anime: Anime;
  title?: string;
  cover?: string;
  number: number;
  fetchingDate?: EpisodeDate;
  releaseDate: EpisodeDate;
  streamLinks: EpisodeLink[];
  downloadLinks?: EpisodeLink[];
  subtitlesLang?: string;
  isViewed?: boolean;
  isRegular?: boolean;
}

export interface EpisodeLink {
  url: string;
  lang: string;
  isDubbed?: boolean;
  isSubtitled?: boolean;
}

export type EpisodeDate = number;

export enum EpisodeSortingCriteria {
  FetchingDate = 'fetchingDate',
  ReleaseDate = 'releaseDate',
}

export class EpisodeRange {
  private _range: Episode[] = [];
  first: Episode;
  last: Episode;
  releaseDate?: EpisodeDate;

  constructor(range?: Episode[], releaseDate?: EpisodeDate) {
    if (range?.length) {
      this.range = range;
    }
    if (releaseDate) {
      this.releaseDate = releaseDate;
    }
  }

  get range(): Episode[] {
    return this._range;
  }

  set range(value: Episode[]) {
    this._range = value;
    this.first = this.getFirst();
    this.last = this.getLast();
  }

  private getFirst(): Episode {
    return this.range[0] || null;
  }

  private getLast(): Episode {
    const lastIndex = this.range.length - 1;
    return lastIndex > 0 ? this.range[lastIndex] : null;
  }
}

export interface ViewedEpisode {
  animeTitle: string;
  number: number;
}
