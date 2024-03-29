import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebugService {
  private enabled: boolean = !environment.production;
  private displayTime: boolean = false;

  enable(displayTime?: boolean) {
    this.enabled = true;
    this.displayTime = displayTime || false;
  }

  disable() {
    this.enabled = false;
  }

  isEnabled() {
    return this.enabled;
  }

  log(message: any, ...params: any) {
    this.writeToConsole(console.log, message, ...params);
  }

  warn(message: any, ...params: any) {
    this.writeToConsole(console.warn, message, ...params);
  }

  private writeToConsole(logFunction: Function, message: any, ...params: any) {
    if (this.enabled) {
      let data = this.displayTime ? [this.getCurrentTime()] : [];
      data = [...data, message, ...params];
      logFunction(...data);
    }
  }

  private getCurrentTime() {
    const now = new Date();
    return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
  }
}
