import { Component, OnInit } from '@angular/core';
import { BrowserService } from 'src/app/services/browser.service';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { take } from 'rxjs/operators';
import { Episode } from 'src/app/models/episode';
import { DebugService } from 'src/app/services/debug.service';
import { isInToday } from 'src/app/helpers/date.helper';
import { isSimilar } from 'src/app/helpers/string.helper';
import { Router } from '@angular/router';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private checkedEpisodes: Episode[] = [];
  private badgeCount: number = 0;

  constructor(
    private browser: BrowserService,
    private settings: SettingsService,
    private router: Router,
    private debug: DebugService,
    private animeProvider: AnimeProviderService,
    private favoriteAnimes: FavoriteAnimesService,
    private viewedEpisodes: ViewedEpisodesService
  ) { }

  ngOnInit(): void {
    if (this.browser.isWebExtension) {
      this.init();
    } else {
      this.router.navigate(['/']);
    }
  }

  private init() {
    this.browser.setBadgeColors('#666', '#fff');
    this.debug.log({
      rate: this.settings.autoCheckRate,
      notifications: this.settings.enableNotifications ? 'on' : 'off'
    });
    this.autoCheckLoop();
    // Handle click on notifications
    this.browser.instance.notifications.onClicked.addListener((notificationId: string) => {
      this.debug.log('Notification clicked:', notificationId);
      const [ id, url ] = notificationId.split('::');
      if (url) {
        this.browser.createTab(url);
      }
    });
  }

  private autoCheckLoop() {
    setTimeout(async () => {
      // Check for latest episodes
      const [count, notifications] = await this.getLatestEpisodesCount();
      this.debug.log('Latest episodes count:', count);
      if (count > 0) {
        // Set badge count
        const badgeText: string = await this.browser.getBadgeText();
        if (badgeText.length) {
          this.badgeCount += count;
        } else {
          this.badgeCount = count;
        }
        this.debug.log('Total count:', this.badgeCount);
        this.browser.setBadgeText(this.badgeCount);
        // Notify
        if (this.settings.enableNotifications) {
          notifications.forEach((notification: Notification) => {
            this.browser.sendNotification(notification.message, notification.url);
          });
        }
      }
      // Re-loop
      await this.settings.refresh();
      this.autoCheckLoop();
    }, this.settings.autoCheckRate * 60 * 1000); // convert minutes to milliseconds
  }

  private getLatestEpisodesCount(): Promise<[number, Notification[]]> {
    return new Promise(async (resolve, reject) => {

      let count: number = 0;
      let notifications: Notification[] = [];

      const [episodes, days] = await this.animeProvider.getLatestEpisodes(true, false).pipe(take(1)).toPromise();

      this.debug.log('Latest episodes:', episodes);
      this.debug.log('Checked episodes:', this.checkedEpisodes);

      // Refresh viewed episodes & favorite animes (refetch from local storage)
      await this.viewedEpisodes.refresh();
      await this.favoriteAnimes.refresh();

      episodes.forEach((episode: Episode) => {
        // Generate notification messages (for favorite animes episodes only)
        if (
          !this.isAlreadyChecked(episode) &&
          isInToday(new Date(episode.releaseDate)) &&
          !this.viewedEpisodes.isViewed(episode) &&
          this.favoriteAnimes.isFavorite(episode.anime.title)
        ) {
          notifications.push({
            message: `${episode.anime.title} ${episode.number} released!`,
            url: episode.streamLinks[0].url
          });
          // update count
          count++;
          // remember as checked
          this.checkedEpisodes.push(episode);
        }
      });

      resolve([count, notifications]);

    });
  }

  private isAlreadyChecked(episode: Episode) {
    return !!this.checkedEpisodes.find((e: Episode) => isSimilar(e.anime.title, episode.anime.title) && e.number === episode.number);
  }
}
