import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AnimeProviderService } from 'src/app/services/anime-provider.service';
import { EpisodeRelease } from 'src/app/models/episode-release';
import { ChooseLinkDialogComponent } from '../choose-link-dialog/choose-link-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChildren('streamLinksDialog') streamLinksDialog: QueryList<ChooseLinkDialogComponent>;
  @ViewChildren('downloadLinksDialog') downloadLinksDialog: QueryList<ChooseLinkDialogComponent>;
  open = false;
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

  onReleaseClick(event: Event, release: EpisodeRelease, index: number) {
    if (release.streamLinks.length > 1) {
      event.preventDefault();
      this.openStreamLinks(index);
      return false;
    }
  }

  openStreamLinks(index: number) {
    this.streamLinksDialog.toArray()[index].open();
  }

  openDownloadLinks(index: number) {
    this.downloadLinksDialog.toArray()[index].open();
  }

}
