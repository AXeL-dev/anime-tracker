import { Anime } from './anime';

export interface Episode {
  anime: Anime;
  title?: string;
  cover?: string;
  number: number;
  releaseDate: EpisodeReleaseDate;
  streamLinks: EpisodeLink[];
  downloadLinks?: EpisodeLink[];
  subtitlesLang?: string;
  isViewed?: boolean;
}

export interface EpisodeLink {
  url: string;
  lang: string;
  isDubbed?: boolean;
  isSubtitled?: boolean;
}

export type EpisodeReleaseDate = string | number | Date;

export type EpisodeLangColor = {[key: string]: string};

export const EpisodeLangColors: EpisodeLangColor = {
  'vostfr': 'blue',
  'vostar': 'yellow',
  'vosten': 'dark',
  'vf': 'green',
};

export class EpisodeRange {
  private _range: Episode[] = [];
  first: Episode;
  last: Episode;
  releaseDate?: EpisodeReleaseDate;

  constructor(range?: Episode[], releaseDate?: EpisodeReleaseDate) {
    if (range?.length) {
      this.setRange(range);
    }
    if (releaseDate) {
      this.releaseDate = releaseDate;
    }
  }

  get range(): Episode[] {
    return this._range;
  }

  setRange(range: Episode[]): void {
    this._range = range;
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
