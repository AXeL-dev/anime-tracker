import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Notification, NotificationStatus, NotificationType } from 'src/app/models/notification';
import { now } from '../helpers/date.helper';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];
  private canSendMessage: boolean = false;
  private canUpdateBackgroundNotifications: boolean = true;

  constructor(private browser: BrowserService, private router: Router) {
    this.canSendMessage = this.browser.isWebExtension && this.router.url !== '/background';
    if (this.canSendMessage) {
      this.fetchFromBackgroundScript();
    }
    this.listenToConsole();
  }

  private async fetchFromBackgroundScript() {
    const notifications: Notification[] = await this.browser.sendMessage('getNotifications') as Notification[];
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
    this.notifications.unshift({
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
    if (this.canSendMessage && this.canUpdateBackgroundNotifications) {
      this.browser.sendMessage('markNotificationsAsRead');
      this.canUpdateBackgroundNotifications = false; // Allow updating background notifications only once
    }
    this.notifications.forEach((notification: Notification) => {
      notification.status = NotificationStatus.Read;
    });

    return this.notifications;
  }

  get unreadCount() {
    return this.notifications.filter((notification: Notification) =>
      !notification.status || notification.status === NotificationStatus.Unread
    ).length;
  }

  hasUnread() {
    return this.unreadCount > 0;
  }

}
