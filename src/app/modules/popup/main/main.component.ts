import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode } from 'src/app/models/episode';
import { debug } from 'src/app/helpers/debug.helper';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly } from 'src/app/helpers/date.helper';
import { Subscription } from 'rxjs';
import { View } from 'src/app/models/settings';
import { FavoritesService } from 'src/app/services/favorites.service';

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
  private subscription: Subscription = new Subscription();

  constructor(private animeProvider: AnimeProviderService, public settings: SettingsService, private favorites: FavoritesService) { }

  ngOnInit(): void {
    this.view = this.settings.defaultView;
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init() {
    this.isLoading = true;
    this.subscription.add(
      this.animeProvider.getLatestEpisodes().subscribe(([episodes, days]) => {
        // debug('Latest episodes:', episodes);
        // debug('Days:', days);
        // debug('--------------------------');
        // Set episodes
        this.allEpisodes = episodes;
        this.filterEpisodes(episodes, days);
        // Set days
        this.days = days;
      }, (error: Error) => {
        console.error(error.message);
      }, () => {
        this.isLoading = false;
      })
    );
  }

  private filterEpisodes(episodes: Episode[], days: number[]) {
    this.episodes = this.isFavoritesView() ? episodes.filter((episode: Episode) => this.favorites.isFavorite(episode.anime.title)) : episodes;
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
