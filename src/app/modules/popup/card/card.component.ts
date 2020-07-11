import { Component, OnInit, Input, ViewChild, QueryList } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { ChooseLinkDialogComponent } from '../choose-link-dialog/choose-link-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() episode: Episode;
  @ViewChild('streamLinksDialog') streamLinksDialog: ChooseLinkDialogComponent;
  @ViewChild('downloadLinksDialog') downloadLinksDialog: ChooseLinkDialogComponent;

  constructor(private settings: SettingsService, private browser: BrowserService, private favorites: FavoritesService) { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
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
    this.streamLinksDialog.open();
  }

  openDownloadLinks() {
    this.downloadLinksDialog.open();
  }

  toggleFavorite(value: boolean) {
    if (value) {
      this.favorites.add(this.episode.anime.title);
    } else {
      this.favorites.remove(this.episode.anime.title);
    }
  }

  isFavorite() {
    return this.favorites.isFavorite(this.episode.anime.title);
  }

}
