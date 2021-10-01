import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { EpisodeLink } from 'src/app/models/episode';
import { MdcDialogDirective } from '@blox/material';
import { Dialog } from 'src/app/models/dialog';

@Component({
  selector: 'episode-choose-link-dialog',
  templateUrl: './choose-link-dialog.component.html',
  styleUrls: ['./choose-link-dialog.component.scss'],
})
export class ChooseLinkDialogComponent implements OnInit, Dialog {
  @Input() title: string = 'Choose a link';
  @Input() links: EpisodeLink[] = [];
  @Output() linkClick: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @ViewChild('dialog') private dialog: MdcDialogDirective;

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.dialog.open();
  }

  onClose() {
    this.close.emit();
  }
}
