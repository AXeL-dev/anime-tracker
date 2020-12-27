import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { EpisodeModule } from '../episode/episode.module';


@NgModule({
  declarations: [
    ChooseLinkDialogComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EpisodeModule
  ],
  exports: [
    ChooseLinkDialogComponent,
    CardComponent
  ]
})
export class EpisodeRangeModule { }
