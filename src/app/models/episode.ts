
export interface Episode {
  animeTitle?: string;
  title?: string;
  cover?: string;
  subtitlesLang?: string;
  number: number;
  streamLink: string;
  downloadLink?: string;
  releaseDate?: string | number | Date;
  isNew?: boolean;
  isLast?: boolean;
  isWatched?: boolean;
}
