import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@blox/material';
import { IconToggleDirective } from './directives/icon-toggle/icon-toggle.directive';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ShortDatePipe } from './pipes/shortdate.pipe';
import { UrlPipe } from './pipes/url.pipe';
import { SafePipe } from './pipes/safe.pipe';



@NgModule({
  declarations: [
    IconToggleDirective,
    SearchInputComponent,
    ShortDatePipe,
    UrlPipe,
    SafePipe
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
    SearchInputComponent,
    ShortDatePipe,
    UrlPipe,
    SafePipe
  ]
})
export class SharedModule { }
