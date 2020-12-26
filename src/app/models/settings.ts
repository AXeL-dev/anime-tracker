
export interface Settings {
  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  autoCheckRate: number;
  enableNotifications: boolean;
  enableDebugging: boolean;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;
  mergeCommonEpisodes: boolean;
  // Crawlers
  inactiveCrawlers: string[];
}

export enum View {
  Latest = 'latest',
  Favorites = 'favorites',
}
