import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { debug } from 'src/app/helpers/debug.helper';
import { BrowserService } from 'src/app/services/browser.service';
import { View } from 'src/app/models/settings';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public settings: SettingsService, private router: Router, public browser: BrowserService) { }

  ngOnInit(): void {
    debug('Settings', this.settings);
  }

  saveSettings() {
    if (!this.settings.maxEpisodesToRetrieve) {
      this.settings.maxEpisodesToRetrieve = this.settings.getDefaults().maxEpisodesToRetrieve;
    }
    this.settings.save();
    this.router.navigate(['/']);
  }

  getProxies() {
    return SettingsService.CORSProxies;
  }

  getViews() {
    return Object.keys(View).map((key: string) => {
      return { label: key, value: View[key] };
    });
  }

}
