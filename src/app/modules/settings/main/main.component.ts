import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { debug } from 'src/app/helpers/debug.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public settings: SettingsService, private router: Router) { }

  ngOnInit(): void {
    debug('Settings', this.settings);
  }

  saveSettings() {
    this.settings.save();
    this.router.navigate(['/']);
  }

  getProxies() {
    return SettingsService.CORSProxies;
  }

}
