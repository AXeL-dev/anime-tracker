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
  isWatched?: boolean;
}

export interface EpisodeLink {
  url: string;
  lang: string;
  isDubbed?: boolean;
  isSubtitled?: boolean;
}
