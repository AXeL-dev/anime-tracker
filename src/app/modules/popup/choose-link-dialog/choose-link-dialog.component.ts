import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EpisodeLink } from 'src/app/models/episode';
import { MdcDialogDirective } from '@blox/material';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'app-choose-link-dialog',
  templateUrl: './choose-link-dialog.component.html',
  styleUrls: ['./choose-link-dialog.component.scss']
})
export class ChooseLinkDialogComponent implements OnInit {

  @Input() title: string = 'Choose a link';
  @Input() links: EpisodeLink[] = [];
  @Output() onLinkClick: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('dialog') private dialog: MdcDialogDirective;

  constructor(private settings: SettingsService, private browser: BrowserService) { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open();
  }

  onClick(event: Event, url: string) {
    this.onLinkClick.emit();
    if (this.browser.isWebExtension) {
      event.preventDefault();
      this.browser.createTab(url, !this.settings.openLinksInInactiveTabs);
    }
  }

}
