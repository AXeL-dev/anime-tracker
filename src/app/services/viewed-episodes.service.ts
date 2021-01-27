import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Episode, ViewedEpisode } from '../models/episode';
import { isSimilar } from '../helpers/string.helper';

@Injectable({
  providedIn: 'root'
})
export class ViewedEpisodesService {

  private viewed: ViewedEpisode[];

  constructor(private storage: StorageService) {
    this.init();
  }

  private async init() {
    const viewed = await this.storage.get('viewed');
    this.viewed = viewed?.length ? viewed : [];
  }

  private save() {
    this.storage.save('viewed', this.viewed);
  }

  get() {
    return this.viewed;
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
    const viewed = this.viewed?.filter((e: ViewedEpisode) => !(isSimilar(e.animeTitle, episode.anime.title, 0.9, true) && e.number === episode.number));
    if (viewed?.length < this.viewed?.length) {
      this.viewed = viewed;
      this.save();
    }
  }

  isViewed(episode: Episode) {
    return !!this.viewed?.find((e: ViewedEpisode) => isSimilar(e.animeTitle, episode.anime.title, 0.9, true) && e.number === episode.number);
  }

  isRegular(episode: Episode) {
    return !!this.viewed?.find((e: ViewedEpisode) => isSimilar(e.animeTitle, episode.anime.title, 0.7));
  }

  refresh() {
    return this.init();
  }

}
