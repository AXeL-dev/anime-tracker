
export interface Settings {
  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  autoCheckRate: number;
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
