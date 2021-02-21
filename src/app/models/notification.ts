
export interface Notification {
  message: string,
  type?: NotificationType,
  date?: Date,
  status?: NotificationStatus
}

export interface EpisodeNotification extends Notification {
  episode: NotificationEpisodeData,
}

export interface NotificationEpisodeData {
  index: number,
  url?: string
}

export enum NotificationType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

export enum NotificationStatus {
  Read = 'read',
  Unread = 'unread',
}
