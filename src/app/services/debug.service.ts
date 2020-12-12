import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  private enabled: boolean = !environment.production;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  isEnabled() {
    return this.enabled;
  }

  log(message: any, ...params: any) {
    if (this.enabled) {
      console.log(message, ...params);
    }
  }
}
