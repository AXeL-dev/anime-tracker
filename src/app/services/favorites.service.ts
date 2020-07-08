import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: string[];

  constructor(private storage: StorageService) {
    this.get();
  }

  private async get() {
    const favorites = await this.storage.get('favorites');
    this.favorites = favorites?.length ? favorites : [];
  }

  private save() {
    this.storage.save('favorites', this.favorites);
  }

  add(title: string) {
    if (this.favorites?.indexOf(title) === -1) {
      this.favorites.push(title);
      this.save();
    }
  }

  remove(title: string) {
    const index = this.favorites?.indexOf(title);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.save();
    }
  }

  isFavorite(title: string) {
    return this.favorites?.indexOf(title) !== -1;
  }

}
