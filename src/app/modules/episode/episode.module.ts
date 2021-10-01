import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { LinkListComponent } from './link-list/link-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChooseLinkDialogComponent, CardComponent, LinkListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, // so we can use routerLink directive
  ],
  exports: [ChooseLinkDialogComponent, CardComponent, LinkListComponent],
})
export class EpisodeModule {}
