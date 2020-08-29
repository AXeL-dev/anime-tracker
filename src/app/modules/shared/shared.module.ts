import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@blox/material';
import { IconToggleDirective } from './directives/icon-toggle.directive';



@NgModule({
  declarations: [
    IconToggleDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    IconToggleDirective
  ]
})
export class SharedModule { }
