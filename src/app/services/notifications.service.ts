import { Injectable } from '@angular/core';
import { Notification, NotificationStatus, NotificationType } from 'src/app/models/notification';
import { now } from '../helpers/date.helper';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];

  constructor(private browser: BrowserService) {
    if (this.browser.isWebExtension) {
      this.fetchFromBackgroundScript();
    }
    this.listenToConsole();
  }

  private async fetchFromBackgroundScript() {
    const notifications = await this.browser.api?.runtime.sendMessage({ message: 'getNotifications' });
    if (notifications?.length) {
      this.notifications = [...notifications];
    }
  }

  private listenToConsole() {
    // listen to console errors
    const consoleError = console.error;
    console.error = (message: any, ...params: any) => {
      this.push(message, NotificationType.Error);
      consoleError(message, ...params);
    };
  }

  push(message: string, type: NotificationType = NotificationType.Info) {
    this.notifications.push({
      message: message,
      type: type,
      date: now(),
      status: NotificationStatus.Unread
    });
  }

  get() {
    return this.notifications;
  }

  markAllAsRead() {
    this.browser.api?.runtime.sendMessage({ message: 'markNotificationsAsRead' });
    this.notifications.forEach((notification: Notification) => {
      notification.status = NotificationStatus.Read;
    });

    return this.notifications;
  }

  hasUnread() {
    return this.notifications.filter((notification: Notification) =>
      !notification.status || notification.status === NotificationStatus.Unread
    ).length > 0;
  }

}
