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
  isLoading = true;

  constructor(private animeProvider: AnimeProviderService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getLatestEpisodes();
    }, 1000);
  }

  async getLatestEpisodes() {
    this.isLoading = true;
    const episodes: Episode[] = await this.animeProvider.getLatestEpisodes();
    console.log(episodes);
    this.episodes = episodes;
    this.isLoading = false;
  }

  toggleDrawer() {
    this.open = !this.open;
  }

}
