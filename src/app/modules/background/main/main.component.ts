import { Component, OnInit } from '@angular/core';
import { BrowserService } from 'src/app/services/browser.service';
import { StorageService } from 'src/app/services/storage.service';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { take } from 'rxjs/operators';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { Episode } from 'src/app/models/episode';
import { Settings } from 'src/app/models/settings';
import { DebugService } from 'src/app/services/debug.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private readonly defaults: any = {
    autoCheckRate: 30, // minute(s)
  };
  private checkedEpisodes: Episode[] = [];

  constructor(
    private browser: BrowserService,
    private storage: StorageService,
    private debug: DebugService,
    private animeProvider: AnimeProviderService,
    private favoriteAnimes: FavoriteAnimesService
  ) { }

  ngOnInit(): void {
    if (this.browser.isWebExtension) {
      this.init();
    }
  }

  async init() {
    this.browser.setBadgeColors('#666', '#fff');
    const rate = await this.getAutoCheckRate();
    this.debug.log('Rate:', rate);
    this.autoCheckLoop(rate);
  }

  autoCheckLoop(rate: number) {
    setTimeout(async () => {
      // Check for latest episodes
      const [count, notificationMessages] = await this.getLatestEpisodesCount();
      const totalCount = this.checkedEpisodes.length += count;
      this.debug.log('Latest episodes count:', count, 'Total count:', totalCount);
      this.browser.setBadgeText(totalCount);
      // Notify
      if (count > 0) {
        notificationMessages.forEach((message: string) => {
          this.browser.sendNotification(message);
        });
      }
      // Re-loop
      const rate = await this.getAutoCheckRate();
      this.autoCheckLoop(rate);
    }, rate * 60 * 1000); // convert minutes to milliseconds
  }

  getAutoCheckRate(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const settings: Settings = await this.storage.get('settings');
      resolve(settings?.autoCheckRate || this.defaults.autoCheckRate);
    });
  }

  getLatestEpisodesCount(): Promise<[number, string[]]> {
    return new Promise(async (resolve, reject) => {

      let count: number = 0;
      let notificationMessages: string[] = [];

      const [episodes, days] = await this.animeProvider.getLatestEpisodes(false).pipe(take(1)).toPromise();

      this.debug.log('Checked episodes:', this.checkedEpisodes);

      episodes
        // Remove already checked episodes
        .filter((episode: Episode) => !this.checkedEpisodes.find((e: Episode) => e.anime.title === episode.anime.title && e.number === episode.number))
        // Generate notifications for favorite animes episodes only
        .forEach((episode: Episode) => {
          if (this.favoriteAnimes.isFavorite(episode.anime.title)) {
            notificationMessages.push(`${episode.anime.title} ${episode.number} released!`);
            // update count
            count++;
            // remember as checked
            this.checkedEpisodes.push({...episode}); // assign a copy
          }
        });

      resolve([count, notificationMessages]);

    });
  }
}
