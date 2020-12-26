import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Episode, EpisodeLangColor, EpisodeLangColors } from 'src/app/models/episode';
import { MdcDialogDirective } from '@blox/material';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { Dialog } from 'src/app/models/dialog';

@Component({
  selector: 'episode-range-choose-link-dialog',
  templateUrl: './choose-link-dialog.component.html',
  styleUrls: ['./choose-link-dialog.component.scss']
})
export class ChooseLinkDialogComponent implements OnInit, Dialog {

  @Input() title: string = 'Choose a link';
  @Input() episodes: Episode[] = [];
  @Input() linksKey: string = 'streamLinks';
  @Output() linkClick: EventEmitter<Episode> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @ViewChild('dialog') private dialog: MdcDialogDirective;
  langColors: EpisodeLangColor = EpisodeLangColors;
  activeIndex: number = 0;

  constructor(private settings: SettingsService, private browser: BrowserService) { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open();
  }

  onClick(event: Event, url: string, episode: Episode) {
    this.linkClick.emit(episode);
    if (this.browser.isWebExtension) {
      event.preventDefault();
      this.browser.createTab(url, !this.settings.openLinksInInactiveTabs);
    }
  }

  onClose() {
    this.activeIndex = 0;
    this.close.emit();
  }

}
