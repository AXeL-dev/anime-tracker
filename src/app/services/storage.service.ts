import { Injectable } from '@angular/core';

declare var browser: any; // Fixes "Cannot find name 'browser'." error on build

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        browser.storage.local.get(key).then((storage: any) => {
          resolve(storage[key]);
        });
      } catch (e) {
        const value = localStorage.getItem(key);
        let finalValue: any;
        try {
          finalValue = JSON.parse(value);
        } catch (error) {
          finalValue = value;
        }
        resolve(finalValue);
      }
    });
  }

  save(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        browser.storage.local.set({ [key]: value }).then(() => {
          resolve();
        });
      } catch (e) {
        let finalValue: any;
        try {
          finalValue = JSON.stringify(value);
        } catch (error) {
          finalValue = value;
        }
        localStorage.setItem(key, finalValue);
        resolve();
      }
    });
  }
}
