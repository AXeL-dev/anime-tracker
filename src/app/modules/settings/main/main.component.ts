import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { BrowserService } from 'src/app/services/browser.service';
import { DebugService } from 'src/app/services/debug.service';
import { MdcSnackbarService } from '@blox/material';
import { CrawlersService } from 'src/app/services/crawlers.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  activeTabKey: string = 'general';

  constructor(
    private settings: SettingsService,
    private router: Router,
    private debug: DebugService,
    public browser: BrowserService,
    public crawlers: CrawlersService,
    private snackbar: MdcSnackbarService
  ) {}

  ngOnInit(): void {
    this.debug.log('Settings', this.settings);
  }

  saveSettings() {
    if (!this.settings.maxEpisodesToRetrieve) {
      this.settings.maxEpisodesToRetrieve =
        this.settings.defaults.maxEpisodesToRetrieve;
    }
    if (!this.settings.autoCheckRate) {
      this.settings.autoCheckRate = this.settings.defaults.autoCheckRate;
    }
    this.settings.save();
    this.router.navigate(['/']);
    this.snackbar.show({
      message: 'Settings successfully saved!',
      timeout: 3000,
      multiline: this.browser.isPopup,
    });
  }
}
