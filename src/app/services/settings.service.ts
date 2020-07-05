import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';
import { Proxy } from '../models/proxy';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  proxy: string;
  displayAnimesByDays: boolean;

  static readonly CORSProxies: Proxy[] = [
    {
      name: 'cors-anywhere',
      url: 'https://cors-anywhere.herokuapp.com/'
    },
    {
      name: 'JSONProxy',
      url: 'https://jsonp.afeld.me/?url='
    },
    {
      name: 'allOrigins',
      url: 'https://api.allorigins.win/raw?url='
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

  constructor(private storage: StorageService) {
    this.get();
  }

  private async get() {
    const settings = await this.storage.get('settings');
    const defaults = this.getDefaults();
    this.set({...defaults, ...settings}); // any existing settings value will override defaults
  }

  private getDefaults() {
    return {
      proxy: SettingsService.CORSProxies[0].url,
      displayAnimesByDays: true,
    };
  }

  private set(settings: Settings) {
    this.proxy = settings.proxy;
    this.displayAnimesByDays = settings.displayAnimesByDays;
  }

  save() {
    this.storage.save('settings', {
      proxy: this.proxy,
      displayAnimesByDays: this.displayAnimesByDays,
    });
  }
}
