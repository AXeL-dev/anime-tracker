import { Episode } from "./episode";

export interface EpisodeRelease {
  animeTitle: string;
  cover: string;
  number: number;
  date: string | number | Date;
  streamLinks: EpisodeReleaseLink[];
  downloadLinks?: EpisodeReleaseLink[];
  isNew?: boolean;
  isLast?: boolean;
  sources?: Episode[];
}

export interface EpisodeReleaseLink {
  url: string;
  lang: string;
  isDubbed?: boolean;
  isSubtitled?: boolean;
}
