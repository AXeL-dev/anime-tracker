import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { BrowserService } from 'src/app/services/browser.service';
import { View, Settings } from 'src/app/models/settings';
import { CrawlersService } from 'src/app/services/crawlers.service';
import { BaseCrawler } from 'src/app/crawlers/abstract/base.crawler';
import { DebugService } from 'src/app/services/debug.service';
import { MdcSnackbarService } from '@blox/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  allCrawlers: BaseCrawler[] = [];
  private readonly defaults: Settings;

  constructor(
    public settings: SettingsService,
    private crawlers: CrawlersService,
    private router: Router,
    private debug: DebugService,
    public browser: BrowserService,
    private snackbar: MdcSnackbarService
  ) {
    this.allCrawlers = this.crawlers.getAll();
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
      message: 'Settings saved successfully!',
      timeout: 3000
    });
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

  onCrawlerChange(crawler: BaseCrawler) {
    if (crawler.isActive) {
      this.settings.inactiveCrawlers = this.settings.inactiveCrawlers.filter((name: string) => name !== crawler.name);
    } else {
      this.settings.inactiveCrawlers.push(crawler.name);
    }
  }

  onSelectAllCrawlersChange(value: boolean) {
    this.allCrawlers.forEach((crawler: BaseCrawler) => {
      crawler.isActive = value;
    });
  }

}
