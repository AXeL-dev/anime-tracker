import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './general/general.component';
import { DisplayComponent } from './display/display.component';
import { CrawlersComponent } from './crawlers/crawlers.component';


@NgModule({
  declarations: [
    MainComponent,
    GeneralComponent,
    DisplayComponent,
    CrawlersComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
