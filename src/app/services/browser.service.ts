import { Injectable } from '@angular/core';
import { now } from '../helpers/date.helper';
import { DebugService } from './debug.service';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  isWebExtension: boolean;
  isPopup: boolean;
  isFirefox: boolean;
  isChrome: boolean;

  constructor(private debug: DebugService) {
    try {
      this.isWebExtension = !!browser;
    } catch(error) {
      this.isWebExtension = false;
    }
    this.isPopup = window.innerWidth < 1000;
    this.isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    this.isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
    // Handle click on notifications
    if (this.isWebExtension) {
      browser.notifications.onClicked.addListener((notificationId: string) => {
        this.debug.log('Notification clicked:', notificationId);
        const [ id, url ] = notificationId.split('::');
        if (url) {
          this.createTab(url);
        }
      });
    }
  }

  createTab(url: string, isActive: boolean = true): Promise<any> {
    return browser.tabs.create({
      url: url,
      active: isActive
    });
  }

  getUrl(path: string) {
    return browser.extension.getURL(path);
  }

  executeScript(tabId: number, code: string): void {
    browser.tabs.executeScript(
      tabId, {
        code: code
      }
    );
  }

  sendNotification(message: string, url?: string, type: string = 'basic'): void {
    const id = url?.length ? now().getTime() + '::' + url : ''; // id will be auto-generated if empty
    browser.notifications.create(id, {
      type: type,
      title: 'Anime Tracker',
      iconUrl: 'assets/icons/128.png',
      message: message
    });
  }

  setBadgeText(text: string|number): void {
    browser.browserAction.setBadgeText({
      text: text === 0 ? '' : text.toString()
    });
  }

  setBadgeColors(backgroundColor: string, textColor: string): void {
    if (this.isFirefox) {
      browser.browserAction.setBadgeTextColor({ color: textColor });
    }
    browser.browserAction.setBadgeBackgroundColor({ color: backgroundColor });
  }

  getBadgeText(): Promise<string> {
    return browser.browserAction.getBadgeText({});
  }
}
