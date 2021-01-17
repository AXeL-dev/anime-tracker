import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { View } from 'src/app/models/settings';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display.component.html',
  styleUrls: [
    './display.component.scss',
    '../settings.shared.scss'
  ]
})
export class DisplayComponent implements OnInit {

  readonly views: { label: string, value: View }[] = [];

  constructor(
    public settings: SettingsService,
    public browser: BrowserService
  ) {
    this.views = Object.keys(View).map((key: string) => {
      return { label: key, value: View[key] };
    });
  }

  ngOnInit(): void {
  }

}
