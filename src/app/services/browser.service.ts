import { Injectable } from '@angular/core';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  isWebExtension: boolean;
  isPopup: boolean;
  isFirefox: boolean;
  isChrome: boolean;

  constructor() {
    try {
      this.isWebExtension = !!browser;
    } catch(error) {
      this.isWebExtension = false;
    }
    this.isPopup = window.innerWidth < 1000;
    this.isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    this.isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
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

  sendNotification(message: string, type: string = 'basic'): void {
    browser.notifications.create({
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
