import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@blox/material';
import { IconToggleDirective } from './directives/icon-toggle.directive';
import { SearchInputComponent } from './components/search-input/search-input.component';



@NgModule({
  declarations: [
    IconToggleDirective,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    IconToggleDirective,
    SearchInputComponent
  ]
})
export class SharedModule { }
