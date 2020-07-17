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
