
export interface Notification {
  message: string,
  type?: NotificationType,
  date?: Date,
  isViewed?: boolean
}

export interface EpisodeNotification extends Notification {
  episode: NotificationEpisodeData,
}

export interface NotificationEpisodeData {
  index: number,
  url?: string
}

export enum NotificationType {
  Info = 'info',
  Error = 'error',
}
