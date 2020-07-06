import { Component, OnInit, Input, ViewChild, QueryList } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { ChooseLinkDialogComponent } from '../choose-link-dialog/choose-link-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() episode: Episode;
  @ViewChild('streamLinksDialog') streamLinksDialog: ChooseLinkDialogComponent;
  @ViewChild('downloadLinksDialog') downloadLinksDialog: ChooseLinkDialogComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    if (this.episode.streamLinks.length > 1) {
      event.preventDefault();
      this.openStreamLinks();
      return false;
    }
  }

  openStreamLinks() {
    this.streamLinksDialog.open();
  }

  openDownloadLinks() {
    this.downloadLinksDialog.open();
  }

}
