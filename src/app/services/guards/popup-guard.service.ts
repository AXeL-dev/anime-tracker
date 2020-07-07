import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings.service';
import { BrowserService } from '../browser.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class PopupGuardService implements CanActivate {

  constructor(
    private router: Router,
    private settings: SettingsService,
    private browser: BrowserService,
    private storage: StorageService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const page = route.queryParams['page'];
    const isRedirection = route.queryParams['isRedirection'];

    if (!page || page === 'popup') {
      if (this.browser.isWebExtension) {
        const openInNewTabLock = await this.storage.get('openInNewTabLock');
        if (!isRedirection && this.settings.openInNewTab && !openInNewTabLock) {
          this.storage.save('openInNewTabLock', true);
          this.browser.createTab(this.browser.getUrl('index.html'));
          return false;
        } else if (openInNewTabLock) {
          this.storage.save('openInNewTabLock', false);
        }
      }
      return true;
    }

    this.router.navigate(['/' + page]);
    return false;
  }

}
