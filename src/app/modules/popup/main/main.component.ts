import { Component, OnInit } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { EpisodeRelease } from 'src/app/models/episode-release';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  open = false;
  headerType = 'header';
  releases: any = [];
  isLoading = true;

  constructor(private animeProvider: AnimeProviderService) { }

  ngOnInit(): void {
    this.getLatestReleases();
  }

  async getLatestReleases() {
    this.isLoading = true;
    const releases: EpisodeRelease[] = await this.animeProvider.getLatest();
    console.log(releases);
    this.releases = releases;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  toggleDrawer() {
    this.open = !this.open;
  }

}
