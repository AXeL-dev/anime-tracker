import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@blox/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IconToggleDirective } from './directives/icon-toggle/icon-toggle.directive';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { BadgeButtonComponent } from './components/badge-button/badge-button.component';
import { ShortDatePipe } from './pipes/shortdate.pipe';
import { DateTimePipe } from './pipes/datetime.pipe';
import { UrlPipe } from './pipes/url.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ProxyPipe } from './pipes/proxy.pipe';

@NgModule({
  declarations: [
    IconToggleDirective,
    SearchInputComponent,
    BadgeButtonComponent,
    ShortDatePipe,
    DateTimePipe,
    UrlPipe,
    SafePipe,
    ProxyPipe,
  ],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    FormsModule,
    MaterialModule,
    InfiniteScrollModule,
    IconToggleDirective,
    SearchInputComponent,
    BadgeButtonComponent,
    ShortDatePipe,
    DateTimePipe,
    UrlPipe,
    SafePipe,
    ProxyPipe,
  ],
})
export class SharedModule {}
