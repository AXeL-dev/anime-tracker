import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { LinkListComponent } from './link-list/link-list.component';


@NgModule({
  declarations: [
    ChooseLinkDialogComponent,
    CardComponent,
    LinkListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChooseLinkDialogComponent,
    CardComponent,
    LinkListComponent
  ]
})
export class EpisodeModule { }
