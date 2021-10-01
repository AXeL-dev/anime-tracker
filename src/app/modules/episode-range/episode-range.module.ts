import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { EpisodeModule } from '../episode/episode.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChooseLinkDialogComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    EpisodeModule,
    RouterModule, // so we can use routerLink directive
  ],
  exports: [ChooseLinkDialogComponent, CardComponent],
})
export class EpisodeRangeModule {}
