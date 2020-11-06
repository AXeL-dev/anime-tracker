
export interface Settings {
  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  autoCheckRate: number;
  enableNotifications: boolean;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;
  // Crawlers
  inactiveCrawlers: string[];
}

export enum View {
  Latest = 'latest',
  Favorites = 'favorites',
}
