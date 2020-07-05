import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // Init settings service on app initialisation
    { provide: APP_INITIALIZER, useFactory: SettingsService.init, deps: [SettingsService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
