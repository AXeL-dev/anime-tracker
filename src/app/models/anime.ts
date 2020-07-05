import { Episode } from './episode';

export interface Anime {
  title: string;
  cover: string;
  link: string;
  episodes: Episode[];
  authors?: string[];
  genres?: string[];
  summary?: string;
  status?: AnimeStatus;
  releaseDate?: string | number | Date;
  rating?: number;
  isBookmarked?: boolean;
}

export enum AnimeStatus {
  ComingSoon,
  OnGoing,
  Stopped,
  Finished
}
