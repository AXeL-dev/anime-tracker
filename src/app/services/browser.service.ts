import { Injectable } from '@angular/core';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  api: any;
  isWebExtension: boolean;
  isPopup: boolean;
  isFirefox: boolean;
  isChrome: boolean;

  constructor() {
    try {
      this.api = browser;
      this.isWebExtension = !!this.api;
    } catch(error) {
      this.isWebExtension = false;
    }
    this.isPopup = window.innerWidth < 1000;
    this.isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    this.isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
  }

  createTab(url: string, isActive: boolean = true): Promise<any> {
    if (!this.isWebExtension) {
      return;
    }
    return browser.tabs.create({
      url: url,
      active: isActive
    });
  }

  getUrl(path: string) {
    if (!this.isWebExtension) {
      return path;
    }
    return browser.extension.getURL(path);
  }

  executeScript(tabId: number, code: string): void {
    if (!this.isWebExtension) {
      return;
    }
    browser.tabs.executeScript(
      tabId, {
        code: code
      }
    );
  }

  sendNotification(message: string, id: string = '', type: string = 'basic'): void { // id will be auto-generated if empty
    if (!this.isWebExtension) {
      return;
    }
    browser.notifications.create(id, {
      type: type,
      title: 'Anime Tracker',
      iconUrl: 'assets/icons/128.png',
      message: message
    });
  }

  sendMessage(message: string, ...params: any) {
    return new Promise(resolve => {
      try {
        browser.runtime.sendMessage({
          message: message,
          params: params
        }).then(({ response } = { response: null }) => {
          resolve(response);
        });
      } catch (error) {
        console.error(error);
        resolve(null);
      }
    });
  }

  setBadgeText(text: string|number): void {
    if (!this.isWebExtension) {
      return;
    }
    browser.browserAction.setBadgeText({
      text: text === 0 ? '' : text.toString()
    });
  }

  setBadgeColors(backgroundColor: string, textColor: string): void {
    if (!this.isWebExtension) {
      return;
    }
    if (this.isFirefox) {
      browser.browserAction.setBadgeTextColor({ color: textColor });
    }
    browser.browserAction.setBadgeBackgroundColor({ color: backgroundColor });
  }

  getBadgeText(): Promise<string> {
    if (!this.isWebExtension) {
      return new Promise(resolve => resolve(''));
    }
    return browser.browserAction.getBadgeText({});
  }
}
