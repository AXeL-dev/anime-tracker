import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupRoutingModule } from './popup-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EpisodeModule } from '../episode/episode.module';
import { EpisodeRangeModule } from '../episode-range/episode-range.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    MainComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    PopupRoutingModule,
    SharedModule,
    EpisodeModule,
    EpisodeRangeModule
  ]
})
export class PopupModule { }
