
export interface Episode {
  animeTitle: string;
  title?: string;
  cover: string;
  number: number;
  releaseDate: string | number | Date;
  streamLinks: EpisodeLink[];
  downloadLinks?: EpisodeLink[];
  subtitlesLang?: string;
  isNew?: boolean;
  isLast?: boolean;
  isWatched?: boolean;
}

export interface EpisodeLink {
  url: string;
  lang: string;
  isDubbed?: boolean;
  isSubtitled?: boolean;
}
