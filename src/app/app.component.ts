import { Component, OnInit } from '@angular/core';
import { BrowserService } from './services/browser.service';
import { SettingsService } from './services/settings.service';
import { DebugService } from './services/debug.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private browser: BrowserService, private settings: SettingsService, private debug: DebugService) {}

  ngOnInit(): void {
    // Fix webExtension popup width
    if (this.browser.isWebExtension && this.browser.isPopup) {
      document.body.style.maxWidth = '600px';
    }
    // Enable debugging
    if (this.settings.enableDebugging) {
      this.debug.forceEnable();
    }
  }
}
