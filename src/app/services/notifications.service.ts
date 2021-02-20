import { Injectable } from '@angular/core';
import { Notification, NotificationType } from 'src/app/models/notification';
import { now } from '../helpers/date.helper';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[];

  constructor() {
    this.listenToConsole();
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
      isViewed: false
    });
  }

  get() {
    return this.notifications;
  }

}
