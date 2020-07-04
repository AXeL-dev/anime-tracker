
export interface Episode {
  animeTitle?: string;
  title?: string;
  cover?: string;
  subtitlesLang?: string;
  number: number;
  streamLink: string;
  downloadLink?: string;
  isNew?: boolean;
  isLast?: boolean;
  isWatched?: boolean;
}
