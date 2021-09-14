import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode, EpisodeRange } from 'src/app/models/episode';
import { SettingsService } from 'src/app/services/settings.service';
import { dateOnly, sameDates, today } from 'src/app/helpers/date.helper';
import { Subject } from 'rxjs';
import { View } from 'src/app/models/settings';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { takeUntil } from 'rxjs/operators';
import { DebugService } from 'src/app/services/debug.service';
import { BrowserService } from 'src/app/services/browser.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { Dialog } from 'src/app/models/dialog';
import { ActivatedRoute } from '@angular/router';
import { isSimilar } from 'src/app/helpers/string.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  view: View;
  isLoading: boolean = true;
  searchValue: string = null;
  episodes: (Episode|EpisodeRange)[] = [];
  days: number[] = [];
  episodesByDays: (Episode|EpisodeRange)[][] = [];
  private allEpisodes: Episode[] = [];
  selectedEpisode: Episode = null;
  selectedEpisodeRange: EpisodeRange = null;
  private componentDestroy: Subject<void> = new Subject();
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
    private debug: DebugService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.browser.isWebExtension) {
      this.browser.setBadgeText(''); // Reset badge count
    }
    this.route.queryParams.pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(params => {
      this.view = params['view'] || this.settings.defaultView;
      this.debug.log('Current view:', this.view);
      if (this.allEpisodes.length > 0) {
        this.filterEpisodes(this.allEpisodes, this.days);
      } else {
        this.fetchEpisodes();
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  private fetchEpisodes(forcedUpdate?: boolean) {
    this.isLoading = true;
    this.animeProvider.getLatestEpisodesByDays(forcedUpdate).pipe(
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
    this.episodes = this.view === View.Favorites ? episodes.filter((episode: Episode) => this.favoriteAnimes.isFavorite(episode.anime.title)) : episodes;
    // Filter by search value
    if (this.searchValue?.length) {
      this.episodes = this.episodes.filter((episode: Episode) => episode.anime.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    }
    // Merge common episodes
    if (this.settings.mergeCommonEpisodes) {
      this.episodes = this.mergeCommonEpisodes(this.episodes as Episode[]);
    }
    // Filter by days
    if (this.settings.displayEpisodesDayByDay) {
      days.forEach((day: number) => {
        if (day) {
          const dayDate = dateOnly(new Date(day));
          this.episodesByDays[day] = this.episodes.filter((episode: Episode|EpisodeRange) => {
            const episodeDate: number = episode.releaseDate ? dateOnly(new Date(episode.releaseDate)) : today();
            return dayDate === episodeDate;
          });
        }
      });
    }
  }

  private mergeCommonEpisodes(episodes: Episode[]) {
    const results: (Episode|EpisodeRange)[] = [];
    const treatedEpisodes: {[key: string]: number[]} = {}; // key == anime title, value == episodes number
    let remainingEpisodes: Episode[] = episodes.slice();
    // Loop over all episodes
    for (let episode of episodes) {
      const treatedEpisodesTitles = Object.keys(treatedEpisodes);
      const foundTitle = treatedEpisodesTitles.find((title: string) =>
        isSimilar(title, episode.anime.title, this.settings.episodeSimilarityDegree, true)
      );
      if (foundTitle && treatedEpisodes[foundTitle].indexOf(episode.number) !== -1) { // if episode already treated
        continue; // go to next episode
      }
      // Try merging common episodes
      const range: Episode[] = remainingEpisodes.filter((e: Episode) => {
        return isSimilar(e.anime.title, episode.anime.title, this.settings.episodeSimilarityDegree, true) &&
          (!this.settings.displayEpisodesDayByDay || sameDates(e.releaseDate, episode.releaseDate, today()));
      });
      // Update treated & remaining episodes
      treatedEpisodes[episode.anime.title] = [
        ...(treatedEpisodes[episode.anime.title] || []), // keep old numbers
        ...range.map((e: Episode) => e.number) // add new range numbers
      ];
      remainingEpisodes = remainingEpisodes.filter((re: Episode) => 
        range.findIndex((e: Episode) => e.anime.title === re.anime.title && e.number === re.number) === -1
      );
      // Save results
      if (range.length > 1) {
        const episodeRange = new EpisodeRange(
          range.sort((a: Episode, b: Episode) => a.number - b.number),
          episode.releaseDate
        );
        results.push(episodeRange);
        // Update selected episode range
        if (this.selectedEpisodeRange?.first.anime.title === episodeRange.first.anime.title) {
          this.selectedEpisodeRange = episodeRange;
        }
      } else {
        results.push(episode);
      }
    }
    return results;
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
    this.isLoading = false;
  }

  refresh() {
    this.episodes = [];
    this.episodesByDays = [];
    this.fetchEpisodes(true);
  }

}
