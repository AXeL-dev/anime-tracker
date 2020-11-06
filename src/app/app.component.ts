import { Component, OnInit } from '@angular/core';
import { BrowserService } from './services/browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private browser: BrowserService) {}

  ngOnInit(): void {
    // Fix webExtension popup width
    if (this.browser.isWebExtension && this.browser.isPopup) {
      document.body.style.maxWidth = '600px';
    }
  }
}
