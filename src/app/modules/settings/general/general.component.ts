import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { BrowserService } from 'src/app/services/browser.service';
import { DebugService } from 'src/app/services/debug.service';
import { CORSProxies } from 'src/app/helpers/proxy.helper';
import { Proxy } from 'src/app/models/proxy';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss', '../settings.shared.scss'],
})
export class GeneralComponent implements OnInit {
  readonly proxies: Proxy[] = CORSProxies;
  selectedProxyIndex: number = -1;

  constructor(
    public settings: SettingsService,
    public browser: BrowserService,
    private debug: DebugService
  ) {}

  ngOnInit(): void {
    this.settings.enableDebugging = this.debug.isEnabled(); // ensure that we get the right debugging state even on dev env.
    if (this.settings.proxy.enabled) {
      this.selectedProxyIndex = this.proxies.findIndex(
        (proxy) => proxy.name === this.settings.proxy.name
      );
    }
  }

  onEnableDebuggingSwitchChange(value: boolean) {
    if (value) {
      this.debug.enable();
    } else {
      this.debug.disable();
    }
  }

  onProxyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const index = target.selectedOptions[0].getAttribute('data-index');
    if (index === null) {
      this.selectedProxyIndex = -1;
      this.settings.proxy.enabled = false;
    } else {
      this.selectedProxyIndex = +index;
      this.settings.proxy.enabled = true;
    }
  }
}
