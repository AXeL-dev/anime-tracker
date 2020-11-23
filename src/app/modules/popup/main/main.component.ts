import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode } from 'src/app/models/episode';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly } from 'src/app/helpers/date.helper';
import { Subject } from 'rxjs';
import { View } from 'src/app/models/settings';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { takeUntil } from 'rxjs/operators';
import { DebugService } from 'src/app/services/debug.service';
import { BrowserService } from 'src/app/services/browser.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { ChooseLinkDialogComponent } from '../choose-link-dialog/choose-link-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  open: boolean = false;
  view: View;
  episodes: Episode[] = [];
  days: number[] = [];
  episodesByDays: Episode[][] = [];
  private allEpisodes: Episode[] = [];
  selectedEpisode: Episode = null;
  isLoading: boolean = true;
  isSearching: boolean = false;
  private componentDestroy: Subject<void> = new Subject();
  searchInputValue: string = null;
  @ViewChild('streamLinksDialog') private streamLinksDialog: ChooseLinkDialogComponent;
  @ViewChild('downloadLinksDialog') private downloadLinksDialog: ChooseLinkDialogComponent;

  constructor(
    private animeProvider: AnimeProviderService,
    private favoriteAnimes: FavoriteAnimesService,
    private viewedEpisodes: ViewedEpisodesService,
    public settings: SettingsService,
    private browser: BrowserService,
    private debug: DebugService
  ) { }

  ngOnInit(): void {
    if (this.browser.isWebExtension) {
      this.browser.setBadgeText(''); // Reset badge count
    }
    this.view = this.settings.defaultView;
    this.init();
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  private init() {
    this.isLoading = true;
    this.animeProvider.getLatestEpisodes().pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(([episodes, days]) => {
      // this.debug.log('Latest episodes:', episodes);
      // this.debug.log('Days:', days);
      // this.debug.log('--------------------------');
      // Set episodes
      this.allEpisodes = episodes;
      this.filterEpisodes(episodes, days);
      // Set days
      this.days = days;
    }, (error: Error) => {
      console.error(error.message);
    }, () => {
      this.isLoading = false;
    });
  }

  private filterEpisodes(episodes: Episode[], days: number[]) {
    this.episodes = this.isFavoritesView() ? episodes.filter((episode: Episode) => this.favoriteAnimes.isFavorite(episode.anime.title)) : episodes;
    if (this.searchInputValue?.length) {
      this.episodes = this.episodes.filter((episode: Episode) => episode.anime.title.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) !== -1);
    }
    if (this.settings.displayEpisodesDayByDay) {
      days.forEach((day: number) => {
        if (day) {
          const dayDate = dateOnly(new Date(day));
          this.episodesByDays[day] = this.episodes.filter((episode: Episode) => {
            if (!episode.releaseDate) {
              return false;
            }
            return dayDate === dateOnly(new Date(episode.releaseDate));
          });
        }
      });
    }
  }

  toggleDrawer() {
    this.open = !this.open;
  }

  showLatest() {
    this.view = View.Latest;
    this.open = false;
    this.filterEpisodes(this.allEpisodes, this.days);
  }

  showFavorites() {
    this.view = View.Favorites;
    this.open = false;
    this.filterEpisodes(this.allEpisodes, this.days);
  }

  isLatestView() {
    return this.view === View.Latest;
  }

  isFavoritesView() {
    return this.view === View.Favorites;
  }

  openStreamLinksDialog(episode: Episode) {
    this.selectedEpisode = episode;
    this.streamLinksDialog.open();
  }

  openDownloadLinksDialog(episode: Episode) {
    this.selectedEpisode = episode;
    this.downloadLinksDialog.open();
  }

  markEpisodeAsViewed(episode: Episode) {
    episode.isViewed = true;
    this.viewedEpisodes.add(episode);
  }

  search(value: string) {
    this.debug.log('Searching for:', value);
    this.filterEpisodes(this.allEpisodes, this.days);
    this.isSearching = false;
  }

}
