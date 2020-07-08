import { Injectable } from '@angular/core';
import { Settings, View } from '../models/settings';
import { Proxy } from '../models/proxy';
import { StorageService } from './storage.service';
import { debug } from '../helpers/debug.helper';
import { BrowserService } from './browser.service';
import { getQueryParam } from '../helpers/url.helper';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;

  static readonly CORSProxies: Proxy[] = [
    {
      name: 'allOrigins',
      url: 'https://api.allorigins.win/raw?url='
    },
    {
      name: 'cors-anywhere',
      url: 'https://cors-anywhere.herokuapp.com/'
    },
    {
      name: 'JSONProxy',
      url: 'https://jsonp.afeld.me/?url='
    },
    // {
    //   name: 'YaCDN',
    //   url: 'https://yacdn.org/proxy/'
    // },
    // {
    //   name: 'WhateverOrigin',
    //   url: 'http://www.whateverorigin.org/get?url='
    // },
  ];

  constructor(private storage: StorageService, private browser: BrowserService) { }

  static init(self: SettingsService) {
    return () => new Promise((resolve, reject) => {
      self.get().then(async () => {
        if (self.browser.isWebExtension) {
          const page = getQueryParam('page');
          if (!page || page === 'popup') {
            // open in new tab
            const openInNewTabLock = await self.storage.get('openInNewTabLock');
            if (self.openInNewTab && !openInNewTabLock) {
              self.storage.save('openInNewTabLock', true);
              self.browser.createTab(self.browser.getUrl('index.html'));
              window.close(); // close popup on Firefox
              reject('openInNewTab is enabled');
            } else if (openInNewTabLock) {
              self.storage.save('openInNewTabLock', false);
            }
          }
        }
        resolve();
      });
    });
  }

  private async get() {
    const settings = await this.storage.get('settings');
    debug('Settings:', settings);
    const defaults = this.getDefaults();
    this.set({...defaults, ...settings}); // any existing settings value will override defaults
  }

  private getDefaults() {
    return {
      proxy: SettingsService.CORSProxies[0].url,
      openInNewTab: this.browser.isFirefox ? true : false,
      openLinksInInactiveTabs: true,
      defaultView: View.Latest,
      displayEpisodesDayByDay: true,
    };
  }

  private set(settings: Settings) {
    this.proxy = settings.proxy;
    this.openInNewTab = settings.openInNewTab;
    this.openLinksInInactiveTabs = settings.openLinksInInactiveTabs;
    this.defaultView = settings.defaultView;
    this.displayEpisodesDayByDay = settings.displayEpisodesDayByDay;
  }

  save() {
    this.storage.save('settings', {
      proxy: this.proxy,
      openInNewTab: this.openInNewTab,
      openLinksInInactiveTabs: this.openLinksInInactiveTabs,
      defaultView: this.defaultView,
      displayEpisodesDayByDay: this.displayEpisodesDayByDay,
    });
  }
}
