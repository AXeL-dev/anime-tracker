import { Injectable } from '@angular/core';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  isWebExtension: boolean;

  constructor() {
    try {
      this.isWebExtension = !!browser;
    } catch(error) {
      this.isWebExtension = false;
    }
  }

  createTab(url: string, isActive: boolean = true): Promise<any> {
    return browser.tabs.create({
      url: url,
      active: isActive
    });
  }
}
