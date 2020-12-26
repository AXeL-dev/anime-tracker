import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChooseLinkDialogComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChooseLinkDialogComponent,
    CardComponent
  ]
})
export class EpisodeModule { }
