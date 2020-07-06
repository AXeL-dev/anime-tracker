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
    this.getLatestEpisodes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getLatestEpisodes() {
    this.isLoading = true;
    this.subscription.add(
      this.animeProvider.getLatestEpisodes().subscribe((episodes: Episode[]) => {
        debug('Latest episodes:', episodes);
        // Set days
        if (this.settings.displayEpisodesDayByDay) {
          episodes.forEach((episode: Episode) => {
            if (episode.releaseDate) {
              const day = dateOnly(new Date(episode.releaseDate));
              if (this.days.indexOf(day) === -1) {
                this.days.push(day);
              }
            }
          });
          debug('Days:', this.days);
        }
        // Set episodes
        this.episodes = episodes;
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

  isSameDay(day1: number, day2: number) {
    if (!day1 || !day2) {
      return false;
    }
    return dateOnly(new Date(day1)) === dateOnly(new Date(day2));
  }

}
