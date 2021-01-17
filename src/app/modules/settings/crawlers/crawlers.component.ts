import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { BaseCrawler } from 'src/app/crawlers/abstract/base.crawler';
import { CrawlersService } from 'src/app/services/crawlers.service';

@Component({
  selector: 'app-crawlers-settings',
  templateUrl: './crawlers.component.html',
  styleUrls: [
    './crawlers.component.scss',
    '../settings.shared.scss'
  ]
})
export class CrawlersComponent implements OnInit {

  allCrawlers: BaseCrawler[] = [];

  constructor(
    public settings: SettingsService,
    public browser: BrowserService,
    private crawlers: CrawlersService
  ) {
    this.allCrawlers = this.crawlers.getAll();
  }

  ngOnInit(): void {
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
      this.onCrawlerChange(crawler);
    });
  }

}
