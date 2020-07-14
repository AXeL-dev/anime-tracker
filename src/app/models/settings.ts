
export interface Settings {
  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;
}

export enum View {
  Latest = 'latest',
  Favorites = 'favorites',
}
