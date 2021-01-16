import { Injectable } from '@angular/core';
import { Settings, View } from '../models/settings';
import { StorageService } from './storage.service';
import { BrowserService } from './browser.service';
import { getQueryParam } from '../helpers/url.helper';
import { DebugService } from './debug.service';
import { CORSProxies } from '../helpers/proxy.helper';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  // General
  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
  maxEpisodesToRetrieve: number;
  autoCheckRate: number;
  enableNotifications: boolean;
  enableDebugging: boolean;
  // Display
  defaultView: View;
  displayEpisodesDayByDay: boolean;
  mergeCommonEpisodes: boolean;
  // Crawlers
  inactiveCrawlers: string[];

  constructor(
    private storage: StorageService,
    private browser: BrowserService,
    private debug: DebugService
  ) { }

  static init(self: SettingsService) { // always executed on app init @see app.module.ts
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
    this.debug.log('Storage settings:', settings);
    const defaults = this.getDefaults();
    this.set({...defaults, ...settings}); // any existing settings value will override defaults
  }

  getDefaults() {
    return {
      proxy: CORSProxies[0].url,
      openInNewTab: this.browser.isFirefox ? true : false,
      openLinksInInactiveTabs: true,
      maxEpisodesToRetrieve: 50,
      autoCheckRate: 30,
      enableNotifications: true,
      enableDebugging: false,
      defaultView: View.Latest,
      displayEpisodesDayByDay: true,
      mergeCommonEpisodes: true,
      inactiveCrawlers: [],
    };
  }

  private set(settings: Settings) {
    this.proxy = settings.proxy;
    this.openInNewTab = settings.openInNewTab;
    this.openLinksInInactiveTabs = settings.openLinksInInactiveTabs;
    this.maxEpisodesToRetrieve = settings.maxEpisodesToRetrieve;
    this.autoCheckRate = settings.autoCheckRate;
    this.enableNotifications = settings.enableNotifications;
    this.enableDebugging = settings.enableDebugging;
    this.defaultView = settings.defaultView;
    this.displayEpisodesDayByDay = settings.displayEpisodesDayByDay;
    this.mergeCommonEpisodes = settings.mergeCommonEpisodes;
    this.inactiveCrawlers = settings.inactiveCrawlers;
  }

  save() {
    this.storage.save('settings', {
      proxy: this.proxy,
      openInNewTab: this.openInNewTab,
      openLinksInInactiveTabs: this.openLinksInInactiveTabs,
      maxEpisodesToRetrieve: this.maxEpisodesToRetrieve,
      autoCheckRate: this.autoCheckRate,
      enableNotifications: this.enableNotifications,
      enableDebugging: this.enableDebugging,
      defaultView: this.defaultView,
      displayEpisodesDayByDay: this.displayEpisodesDayByDay,
      mergeCommonEpisodes: this.mergeCommonEpisodes,
      inactiveCrawlers: this.inactiveCrawlers,
    });
  }

  async refresh() {
    await this.get();
  }

}
