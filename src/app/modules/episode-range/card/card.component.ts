import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EpisodeRange } from 'src/app/models/episode';
import { FavoriteAnimesService } from 'src/app/services/favorite-animes.service';

@Component({
  selector: 'episode-range-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() episodeRange: EpisodeRange;
  @Output() streamLinksClick: EventEmitter<EpisodeRange> = new EventEmitter();
  @Output() downloadLinksClick: EventEmitter<EpisodeRange> = new EventEmitter();

  constructor(private favoriteAnimes: FavoriteAnimesService) { }

  ngOnInit(): void {
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
