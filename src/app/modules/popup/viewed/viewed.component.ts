import { Component, OnInit } from '@angular/core';
import { DebugService } from 'src/app/services/debug.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisode } from 'src/app/models/episode';
import { isSimilar } from 'src/app/helpers/string.helper';

interface ViewedAnime {
  title: string,
  episodes: ViewedEpisode[],
  isFavorite?: boolean
}

interface ViewedAnimesCount {
  all: number,
  favorites: number
}

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.scss']
})
export class ViewedComponent implements OnInit {

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

  constructor(
    private viewedEpisodes: ViewedEpisodesService,
    private favoriteAnimes: FavoriteAnimesService,
    private debug: DebugService
  ) { }

  ngOnInit(): void {
    this.viewedEpisodes.get().forEach((episode: ViewedEpisode) => {
      // Add episode to viewed animes array
      const index = this.allViewedAnimes.findIndex((anime: ViewedAnime) => isSimilar(anime.title, episode.animeTitle));
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
  }

  search(value: string) {
    this.debug.log('Searching for:', value);
    this.filterAnimes();
    this.isLoading = false;
  }

  private filterAnimes() {
    // Filter by search value
    if (this.searchValue?.length) {
      this.viewedAnimes = this.allViewedAnimes.filter((anime: ViewedAnime) => anime.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    } else {
      this.viewedAnimes = this.allViewedAnimes;
    }
    // Update count
    const favorites = this.viewedAnimes.filter((anime: ViewedAnime) => anime.isFavorite);
    this.count = {
      all: this.viewedAnimes.length,
      favorites: favorites.length
    };
    // Then, filter by active tab
    switch (this.activeTab) {
      case this.tabs.Favorites:
        this.viewedAnimes = favorites;
        break;
    }
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

}
