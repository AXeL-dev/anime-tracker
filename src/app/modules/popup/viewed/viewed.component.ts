import { Component, OnInit, OnDestroy } from '@angular/core';
import { DebugService } from 'src/app/services/debug.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisode } from 'src/app/models/episode';
import { isSimilar } from 'src/app/helpers/string.helper';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';

interface ViewedAnime {
  title: string;
  episodes: ViewedEpisode[];
  isFavorite?: boolean;
}

interface ViewedAnimesCount {
  all: number;
  favorites: number;
}

interface infiniteScrollConfig {
  initial: number;
  max: number;
  step: number;
}

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  searchValue: string = null;
  viewedAnimes: ViewedAnime[] = [];
  private allViewedAnimes: ViewedAnime[] = [];
  readonly tabs: {[key: string]: string} = {
    All: 'all',
    Favorites: 'favorites'
  };
  private activeTab: string = this.tabs.All;
  count: ViewedAnimesCount = {
    all: 0,
    favorites: 0
  };
  infiniteScroll: infiniteScrollConfig = {
    initial: 50,
    max: 50,
    step: 50
  };
  private componentDestroy: Subject<void> = new Subject();

  constructor(
    private viewedEpisodes: ViewedEpisodesService,
    private favoriteAnimes: FavoriteAnimesService,
    private settings: SettingsService,
    private debug: DebugService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    // Add viewed episodes to viewed animes array
    const viewed = await this.viewedEpisodes.getAsync();
    viewed.forEach((episode: ViewedEpisode) => {
      const index = this.allViewedAnimes.findIndex((anime: ViewedAnime) => isSimilar(anime.title, episode.animeTitle, this.settings.episodeSimilarityDegree));
      if (index > -1) {
        // Merge with existing anime episodes
        if (!this.allViewedAnimes[index].episodes.find((e: ViewedEpisode) => e.number === episode.number)) {
          this.allViewedAnimes[index].episodes.push(episode);
          this.allViewedAnimes[index].episodes = this.allViewedAnimes[index].episodes.sort(
            (a: ViewedEpisode, b: ViewedEpisode) => b.number - a.number
          );
        } else {
          this.debug.warn('Duplicate viewed episode found:', episode);
        }
      } else {
        // Add new anime
        this.allViewedAnimes.push({
          title: episode.animeTitle,
          episodes: [episode],
          isFavorite: this.favoriteAnimes.isFavorite(episode.animeTitle)
        });
      }
    });
    // Show all viewed animes
    this.viewedAnimes = this.allViewedAnimes;
    // Set count
    this.count = {
      all: this.allViewedAnimes.length,
      favorites: this.allViewedAnimes.filter((anime: ViewedAnime) => anime.isFavorite).length
    };
    // Handle route parameters
    this.route.params.pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(params => {
      this.searchValue = params['search'] || '';
      this.debug.log('Search value:', this.searchValue);
      if (this.searchValue.length) {
        this.search(this.searchValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  search(value: string) {
    this.debug.log('Searching for:', value);
    this.filterAnimes();
    this.isLoading = false;
  }

  private filterAnimes() {
    let filteredAnimes: ViewedAnime[] = [];
    // Filter by search value
    if (this.searchValue?.length) {
      filteredAnimes = this.allViewedAnimes.filter((anime: ViewedAnime) => isSimilar(anime.title, this.searchValue, this.settings.episodeSimilarityDegree));
    } else {
      filteredAnimes = this.allViewedAnimes;
    }
    // Update count
    const favorites = filteredAnimes.filter((anime: ViewedAnime) => anime.isFavorite);
    this.count = {
      all: filteredAnimes.length,
      favorites: favorites.length
    };
    // Then, filter by active tab
    switch (this.activeTab) {
      case this.tabs.Favorites:
        filteredAnimes = favorites;
        break;
    }
    // Display filtered animes
    this.viewedAnimes = filteredAnimes;
    // Reset infinite scroll
    this.infiniteScroll.max = this.infiniteScroll.initial;
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.filterAnimes();
  }

  toggleFavorite(anime: ViewedAnime, value: boolean) {
    if (value) {
      this.favoriteAnimes.add(anime.title);
      anime.isFavorite = true;
    } else {
      this.favoriteAnimes.remove(anime.title);
      anime.isFavorite = false;
    }
  }

  onScroll() {
    this.infiniteScroll.max += this.infiniteScroll.step;
  }

}
