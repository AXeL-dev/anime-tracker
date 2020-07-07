import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { BrowserService } from './services/browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private settings: SettingsService, private browser: BrowserService) {}

  ngOnInit(): void {
    // Fix webExtension width on Firefox
    if (this.browser.isWebExtension && this.browser.isFirefox && !this.settings.openInNewTab) {
      document.body.style.maxWidth = '600px';
    }
  }
}
