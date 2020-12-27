import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EpisodeLink, EpisodeLangColor, EpisodeLangColors } from 'src/app/models/episode';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'episode-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {

  @Input() links: EpisodeLink[] = [];
  @Output() linkClick: EventEmitter<void> = new EventEmitter();
  langColors: EpisodeLangColor = EpisodeLangColors;

  constructor(private settings: SettingsService, private browser: BrowserService) { }

  ngOnInit(): void {
  }

  onClick(event: Event, url: string) {
    this.linkClick.emit();
    if (this.browser.isWebExtension) {
      event.preventDefault();
      this.browser.createTab(url, !this.settings.openLinksInInactiveTabs);
    }
  }

}
