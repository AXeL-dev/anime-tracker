import { EpisodeSortingCriteria } from './episode';

export interface Settings {
  // General
  proxy: ProxySettings;
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

export interface ProxySettings {
  enabled: boolean;
  name?: string;
  apiKey?: string;
}

export enum View {
  Latest = 'latest',
  Favorites = 'favorites',
  FirstEpisodes = '1st',
}

export enum Subtitles {
  Any = '',
  Vostfr = 'vostfr',
  Vosten = 'vosten',
  Vostar = 'vostar',
}
