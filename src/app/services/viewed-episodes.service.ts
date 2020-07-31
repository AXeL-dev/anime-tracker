import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Episode } from '../models/episode';

interface viewedEpisode {
  animeTitle: string,
  number: number
}

@Injectable({
  providedIn: 'root'
})
export class ViewedEpisodesService {

  private viewed: viewedEpisode[];

  constructor(private storage: StorageService) {
    this.get();
  }

  private async get() {
    const viewed = await this.storage.get('viewed');
    this.viewed = viewed?.length ? viewed : [];
  }

  private save() {
    this.storage.save('viewed', this.viewed);
  }

  add(episode: Episode) {
    if (!this.isViewed(episode)) {
      this.viewed.push({
        animeTitle: episode.anime.title,
        number: episode.number
      });
      this.save();
    }
  }

  remove(episode: Episode) {
    const viewed = this.viewed?.filter((e: viewedEpisode) => !(e.animeTitle === episode.anime.title && e.number === episode.number));
    if (viewed?.length < this.viewed?.length) {
      this.viewed = viewed;
      this.save();
    }
  }

  isViewed(episode: Episode) {
    return !!this.viewed?.find((e: viewedEpisode) => e.animeTitle === episode.anime.title && e.number === episode.number);
  }

}
