
export interface Notification {
  message: string,
  episode?: NotificationEpisodeData
}

export interface NotificationEpisodeData {
  index: number,
  url: string
}
