import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Subtitles } from 'src/app/models/settings';

@Component({
  selector: 'app-notifications-settings',
  templateUrl: './notifications.component.html',
  styleUrls: [
    './notifications.component.scss',
    '../settings.shared.scss'
  ]
})
export class NotificationsComponent implements OnInit {

  readonly subtitles: { label: string, value: Subtitles }[] = [];

  constructor(public settings: SettingsService) {
    this.subtitles = Object.keys(Subtitles).map((key: string) => {
      return { label: key, value: Subtitles[key] };
    });
  }

  ngOnInit(): void {
  }

}
