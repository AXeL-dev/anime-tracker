import { Component, OnInit } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { EpisodeRelease } from 'src/app/models/episode-release';
import { debug } from 'src/app/helpers/debug.helper';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly } from 'src/app/helpers/date.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  open = false;
  releases: any = [];
  days: number[] = [];
  isLoading = true;

  constructor(private animeProvider: AnimeProviderService, public settings: SettingsService) { }

  ngOnInit(): void {
    this.getLatestReleases();
  }

  async getLatestReleases() {
    this.isLoading = true;
    const releases: EpisodeRelease[] = await this.animeProvider.getLatest();
    debug('Latest releases:', releases);
    if (this.settings.displayEpisodesDayByDay) {
      releases.forEach((release: EpisodeRelease) => {
        if (release.date) {
          const day = dateOnly(new Date(release.date));
          if (this.days.indexOf(day) === -1) {
            this.days.push(day);
          }
        }
      });
      debug('Days:', this.days);
    }
    this.releases = releases;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
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
