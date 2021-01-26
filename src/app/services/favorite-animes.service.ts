import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteAnimesService {

  private favorites: string[];

  constructor(private storage: StorageService) {
    this.init();
  }

  private async init() {
    const favorites = await this.storage.get('favorites');
    this.favorites = favorites?.length ? favorites : [];
  }

  private save() {
    this.storage.save('favorites', this.favorites);
  }

  get() {
    return this.favorites;
  }

  add(title: string) {
    if (!this.isFavorite(title)) {
      this.favorites.push(title.trim());
      this.save();
    }
  }

  remove(title: string) {
    const index = this.getIndexOf(title);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.save();
    }
  }

  isFavorite(title: string) {
    return this.getIndexOf(title) !== -1;
  }

  private getIndexOf(title: string) {
    return this.favorites?.indexOf(title.trim());
  }

  refresh() {
    return this.init();
  }

}
