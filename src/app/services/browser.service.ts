import { Injectable } from '@angular/core';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  isWebExtension: boolean;
  isFirefox: boolean;
  isChrome: boolean;

  constructor() {
    try {
      this.isWebExtension = !!browser;
    } catch(error) {
      this.isWebExtension = false;
    }
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
}
