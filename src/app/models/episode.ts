import { Anime } from './anime';

export interface Episode {
  anime: Anime;
  title?: string;
  cover?: string;
  number: number;
  releaseDate: string | number | Date;
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

export type EpisodeLangColor = {[key: string]: string};

export const EpisodeLangColors: EpisodeLangColor = {
  'vostfr': 'blue',
  'vostar': 'yellow',
  'vosten': 'dark',
  'vf': 'green',
};

export interface EpisodeRange {
  range: Episode[]
}
