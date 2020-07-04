import { Episode } from "./episode";

export interface EpisodeRelease {
  animeTitle: string;
  cover: string;
  number: number;
  date?: string | Date;
  streamLinks: string[];
  downloadLinks?: string[];
  isNew?: boolean;
  isLast?: boolean;
  sources: Episode[];
}
