import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';
import { Proxy } from '../models/proxy';
import { StorageService } from './storage.service';
import { debug } from '../helpers/debug.helper';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  proxy: string;
  openInNewTab: boolean;
  openLinksInInactiveTabs: boolean;
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

  constructor(private storage: StorageService) { }

  static init(self: SettingsService) {
    return () => new Promise(resolve => {
      self.get().then(() => resolve());
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
      openInNewTab: false,
      openLinksInInactiveTabs: true,
      displayEpisodesDayByDay: true,
    };
  }

  private set(settings: Settings) {
    this.proxy = settings.proxy;
    this.openInNewTab = settings.openInNewTab;
    this.openLinksInInactiveTabs = settings.openLinksInInactiveTabs;
    this.displayEpisodesDayByDay = settings.displayEpisodesDayByDay;
  }

  save() {
    this.storage.save('settings', {
      proxy: this.proxy,
      openInNewTab: this.openInNewTab,
      openLinksInInactiveTabs: this.openLinksInInactiveTabs,
      displayEpisodesDayByDay: this.displayEpisodesDayByDay,
    });
  }
}
