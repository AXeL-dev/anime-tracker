import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';

@Component({
  selector: 'episode-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() episode: Episode;
  @Output() streamLinksClick: EventEmitter<Episode> = new EventEmitter();
  @Output() downloadLinksClick: EventEmitter<Episode> = new EventEmitter();

  constructor(
    private settings: SettingsService,
    private browser: BrowserService,
    private favoriteAnimes: FavoriteAnimesService,
    private viewedEpisodes: ViewedEpisodesService
  ) { }

  ngOnInit(): void {
    this.episode.isViewed = this.viewedEpisodes.isViewed(this.episode);
  }

  onClick(event: Event) {
    if (this.episode.streamLinks.length > 1) {
      event.preventDefault();
      this.showStreamLinks();
      return false;
    } else {
      this.markAsViewed();
      if (this.browser.isWebExtension) {
        event.preventDefault();
        this.browser.createTab(this.episode.streamLinks[0].url, !this.settings.openLinksInInactiveTabs);
      }
    }
  }

  showStreamLinks() {
    this.streamLinksClick.emit(this.episode);
  }

  showDownloadLinks() {
    this.downloadLinksClick.emit(this.episode);
  }

  toggleFavorite(value: boolean) {
    if (value) {
      this.favoriteAnimes.add(this.episode.anime.title);
    } else {
      this.favoriteAnimes.remove(this.episode.anime.title);
    }
  }

  isFavorite() {
    return this.favoriteAnimes.isFavorite(this.episode.anime.title);
  }

  markAsViewed() {
    this.episode.isViewed = true;
    this.viewedEpisodes.add(this.episode);
  }

  markAsUnviewed() {
    this.episode.isViewed = false;
    this.viewedEpisodes.remove(this.episode);
  }

}
