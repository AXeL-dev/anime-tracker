import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EpisodeRange, Episode } from 'src/app/models/episode';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';
import { ViewedEpisodesService } from 'src/app/services/viewed-episodes.service';

@Component({
  selector: 'episode-range-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() episodeRange: EpisodeRange;
  @Output() streamLinksClick: EventEmitter<EpisodeRange> = new EventEmitter();
  @Output() downloadLinksClick: EventEmitter<EpisodeRange> = new EventEmitter();

  constructor(
    private favoriteAnimes: FavoriteAnimesService,
    public viewedEpisodes: ViewedEpisodesService
  ) {}

  ngOnInit(): void {
    this.episodeRange.range = this.episodeRange.range.map((episode) => ({
      ...episode,
      isViewed: this.viewedEpisodes.isViewed(episode),
    }));
    this.episodeRange.allViewed = this.episodeRange.range.every((episode) =>
      this.viewedEpisodes.isViewed(episode)
    );
    this.episodeRange.first.isRegular = this.viewedEpisodes.isRegular(
      this.episodeRange.first
    );
  }

  onClick(event: Event) {
    event.preventDefault();
    this.showStreamLinks();
    return false;
  }

  showStreamLinks() {
    this.streamLinksClick.emit(this.episodeRange);
  }

  showDownloadLinks() {
    this.downloadLinksClick.emit(this.episodeRange);
  }

  toggleFavorite(value: boolean) {
    if (value) {
      this.favoriteAnimes.add(this.episodeRange.first.anime.title);
    } else {
      this.favoriteAnimes.remove(this.episodeRange.first.anime.title);
    }
  }

  isFavorite() {
    return this.favoriteAnimes.isFavorite(this.episodeRange.first.anime.title);
  }
}
