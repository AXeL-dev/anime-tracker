import { Component, OnInit } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { Episode } from 'src/app/models/episode';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  open = false;
  headerType = 'header';
  episodes: any = [];

  constructor(private animeProvider: AnimeProviderService) { }

  ngOnInit(): void {
    this.getLatestEpisodes();
  }

  async getLatestEpisodes() {
    const episodes: Episode[] = await this.animeProvider.getLatestEpisodes();
    console.log(episodes);
    this.episodes = episodes;
  }

  toggleDrawer() {
    this.open = !this.open;
  }

}
