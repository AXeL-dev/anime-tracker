import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { ChooseLinkDialogComponent } from '../choose-link-dialog/choose-link-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() episode: Episode;
  @ViewChild('streamLinksDialog') private streamLinksDialog: ChooseLinkDialogComponent;
  @ViewChild('downloadLinksDialog') private downloadLinksDialog: ChooseLinkDialogComponent;

  constructor(
    private settings: SettingsService,
    private browser: BrowserService,
    private favoriteAnimes: FavoriteAnimesService,
    private viewedEpisodes: ViewedEpisodesService
  ) { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    this.markAsViewed();
    if (this.episode.streamLinks.length > 1) {
      event.preventDefault();
      this.openStreamLinks();
      return false;
    } else if (this.browser.isWebExtension) {
      event.preventDefault();
      this.browser.createTab(this.episode.streamLinks[0].url, !this.settings.openLinksInInactiveTabs);
    }
  }

  openStreamLinks() {
    this.markAsViewed();
    this.streamLinksDialog.open();
  }

  openDownloadLinks() {
    this.markAsViewed();
    this.downloadLinksDialog.open();
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

  isViewed() {
    return this.viewedEpisodes.isViewed(this.episode);
  }

  private markAsViewed() {
    this.viewedEpisodes.add(this.episode);
  }

  markAsUnviewed() {
    this.viewedEpisodes.remove(this.episode);
  }

}
