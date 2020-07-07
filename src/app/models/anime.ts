import { Episode } from './episode';

export interface Anime {
  title: string;
  cover: string;
  link?: string;
  episodes?: Episode[];
  authors?: string[];
  genres?: string[];
  summary?: string;
  status?: AnimeStatus;
  releaseDate?: string | number | Date;
  rating?: number;
  isBookmarked?: boolean;
  isFavorite?: boolean;
  isNew?: boolean; // ToDo: can be replaced with status
  isFinished?: boolean; // the same
}

export enum AnimeStatus {
  New,
  ComingSoon,
  OnGoing,
  Stopped,
  Finished
}
