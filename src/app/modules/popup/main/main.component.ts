import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode } from 'src/app/models/episode';
import { debug } from 'src/app/helpers/debug.helper';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly } from 'src/app/helpers/date.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  open = false;
  episodes: Episode[] = [];
  days: number[] = [];
  isLoading = true;
  private subscription: Subscription = new Subscription();

  constructor(private animeProvider: AnimeProviderService, public settings: SettingsService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init() {
    this.isLoading = true;
    this.subscription.add(
      this.animeProvider.getLatestEpisodes(this.settings.displayEpisodesDayByDay).subscribe(([episodes, days, isSlice]) => {
        // debug('Latest episodes:', episodes);
        // debug('Days:', days);
        // debug('isSlice:', isSlice);
        // debug('--------------------------');
        // Set episodes
        this.episodes = isSlice ? [...this.episodes, ...episodes] : episodes;
        // Set days
        this.days = days;
      }, (error: Error) => {
        console.error(error.message);
      }, () => {
        this.isLoading = false;
      })
    );
  }

  toggleDrawer() {
    this.open = !this.open;
  }

  getEpisodesbyDay(day: number) {
    return this.episodes.filter((episode: Episode) => {
      if (!day || !episode.releaseDate) {
        return false;
      }
      return dateOnly(new Date(day)) === dateOnly(new Date(episode.releaseDate));
    });
  }

}
