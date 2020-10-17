import { Component, OnInit, OnDestroy } from '@angular/core';
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
  isLoading: boolean = true;
  private componentDestroy: Subject<void> = new Subject();

  constructor(
    private animeProvider: AnimeProviderService,
    private favoriteAnimes: FavoriteAnimesService,
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

}
