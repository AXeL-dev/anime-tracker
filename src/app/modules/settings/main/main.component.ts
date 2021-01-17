import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { BrowserService } from 'src/app/services/browser.service';
import { Settings } from 'src/app/models/settings';
import { DebugService } from 'src/app/services/debug.service';
import { MdcSnackbarService } from '@blox/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  activeTabKey: string = 'general';
  private readonly defaults: Settings;

  constructor(
    private settings: SettingsService,
    private router: Router,
    private debug: DebugService,
    private browser: BrowserService,
    private snackbar: MdcSnackbarService
  ) {
    this.defaults = this.settings.getDefaults();
  }

  ngOnInit(): void {
    this.debug.log('Settings', this.settings);
  }

  saveSettings() {
    if (!this.settings.maxEpisodesToRetrieve) {
      this.settings.maxEpisodesToRetrieve = this.defaults.maxEpisodesToRetrieve;
    }
    if (!this.settings.autoCheckRate) {
      this.settings.autoCheckRate = this.defaults.autoCheckRate;
    }
    this.settings.save();
    this.snackbar.show({
      message: 'Settings successfully saved!',
      timeout: 3000,
      multiline: this.browser.isPopup
    });
    this.router.navigate(['/']);
  }

}
