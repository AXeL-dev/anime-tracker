import { EpisodeSortingCriteria } from './episode';

export interface Settings {
  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  enableDebugging: boolean;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;
  mergeCommonEpisodes: boolean;
  sortEpisodesBy: EpisodeSortingCriteria;
  episodeSimilarityDegree: number;
  // Notifications
  enableNotifications: boolean;
  autoCheckRate: number;
  preferredSubtitles: string;
  // Crawlers
  inactiveCrawlers: string[];
}

export enum View {
  Latest = 'latest',
  Favorites = 'favorites',
}

export enum Subtitles {
  Any = '',
  Vostfr = 'vostfr',
  Vosten = 'vosten',
  Vostar = 'vostar',
}
