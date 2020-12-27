import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { MdcDialogDirective } from '@blox/material';
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
  activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open();
  }

  onClose() {
    this.activeIndex = 0;
    this.close.emit();
  }

}
