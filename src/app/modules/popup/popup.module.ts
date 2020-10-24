import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupRoutingModule } from './popup-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ChooseLinkDialogComponent } from './choose-link-dialog/choose-link-dialog.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    MainComponent,
    ChooseLinkDialogComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    PopupRoutingModule,
    SharedModule
  ]
})
export class PopupModule { }
