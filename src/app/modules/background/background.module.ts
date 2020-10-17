import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundRoutingModule } from './background-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    BackgroundRoutingModule
  ]
})
export class BackgroundModule { }
