import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EpisodeReleaseLink } from 'src/app/models/episode-release';
import { MdcDialogDirective } from '@blox/material';

@Component({
  selector: 'app-choose-link-dialog',
  templateUrl: './choose-link-dialog.component.html',
  styleUrls: ['./choose-link-dialog.component.scss']
})
export class ChooseLinkDialogComponent implements OnInit {

  @Input() title: string = 'Choose a link';
  @Input() links: EpisodeReleaseLink[] = [];
  @ViewChild('dialog') private dialog: MdcDialogDirective;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open();
  }

}
