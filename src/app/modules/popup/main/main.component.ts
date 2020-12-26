import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode, EpisodeRange } from 'src/app/models/episode';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly } from 'src/app/helpers/date.helper';
import { Subject } from 'rxjs';
import { View } from 'src/app/models/settings';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { takeUntil } from 'rxjs/operators';
import { DebugService } from 'src/app/services/debug.service';
import { BrowserService } from 'src/app/services/browser.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { Dialog } from 'src/app/models/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  open: boolean = false;
  view: View;
  episodes: (Episode|EpisodeRange)[] = [];
  days: number[] = [];
  episodesByDays: (Episode|EpisodeRange)[][] = [];
  private allEpisodes: Episode[] = [];
  selectedEpisode: Episode = null;
  selectedEpisodeRange: EpisodeRange = null;
  isLoading: boolean = true;
  isSearching: boolean = false;
  private componentDestroy: Subject<void> = new Subject();
  searchInputValue: string = null;
  @ViewChild('episodeStreamLinksDialog') private episodeStreamLinksDialog: Dialog;
  @ViewChild('episodeDownloadLinksDialog') private episodeDownloadLinksDialog: Dialog;
  @ViewChild('episodeRangeStreamLinksDialog') private episodeRangeStreamLinksDialog: Dialog;
  @ViewChild('episodeRangeDownloadLinksDialog') private episodeRangeDownloadLinksDialog: Dialog;

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
    // Filter by view
    this.episodes = this.isFavoritesView() ? episodes.filter((episode: Episode) => this.favoriteAnimes.isFavorite(episode.anime.title)) : episodes;
    // Filter by search input value
    if (this.searchInputValue?.length) {
      this.episodes = this.episodes.filter((episode: Episode) => episode.anime.title.toLowerCase().indexOf(this.searchInputValue.toLowerCase()) !== -1);
    }
    // Merge common episodes
    if (this.settings.mergeCommonEpisodes) {
      const results: (Episode|EpisodeRange)[] = [];
      const treatedEpisodes: {[key: string]: number[]} = {}; // key == anime title, value == episodes number
      let index: number = 0;
      for (let episode of this.episodes as Episode[]) {
        if (treatedEpisodes[episode.anime.title] && treatedEpisodes[episode.anime.title].indexOf(episode.number) !== -1) { // if episode already treated
          continue; // go to next episode
        }
        const range: Episode[] = (this.episodes as Episode[]).slice(index).filter((e: Episode) => {
          return e.anime.title === episode.anime.title && (!this.settings.displayEpisodesDayByDay || e.releaseDate === episode.releaseDate);
        }).sort((a: Episode, b: Episode) => a.number - b.number);
        if (range.length > 1) {
          const episodeRange = new EpisodeRange(range, episode.releaseDate);
          results.push(episodeRange);
          treatedEpisodes[episode.anime.title] = [
            ...(treatedEpisodes[episode.anime.title] || []), // keep old numbers
            ...range.map((e: Episode) => e.number) // add new range numbers
          ];
        } else {
          results.push(episode);
        }
        index++;
      }
      this.episodes = results;
    }
    // Filter by days
    if (this.settings.displayEpisodesDayByDay) {
      days.forEach((day: number) => {
        if (day) {
          const dayDate = dateOnly(new Date(day));
          this.episodesByDays[day] = this.episodes.filter((episode: Episode|EpisodeRange) => {
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

  openStreamLinksDialog(episode: Episode|EpisodeRange) {
    if (episode instanceof EpisodeRange) {
      this.selectedEpisodeRange = episode as EpisodeRange;
      this.episodeRangeStreamLinksDialog.open();
    } else {
      this.selectedEpisode = episode as Episode;
      this.episodeStreamLinksDialog.open();
    }
  }

  openDownloadLinksDialog(episode: Episode|EpisodeRange) {
    if (episode instanceof EpisodeRange) {
      this.selectedEpisodeRange = episode as EpisodeRange;
      this.episodeRangeDownloadLinksDialog.open();
    } else {
      this.selectedEpisode = episode as Episode;
      this.episodeDownloadLinksDialog.open();
    }
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
