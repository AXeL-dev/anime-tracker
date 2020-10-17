import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  private isEnabled = !environment.production;

  forceEnable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  log(message: any, ...params: any) {
    if (this.isEnabled) {
      console.log(message, ...params);
    }
  }
}
