import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { View } from 'src/app/models/settings';
import { Router } from '@angular/router';
import { DebugService } from 'src/app/services/debug.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  openMenu: boolean = false;
  openNotifications: boolean = false;
  private wasNotificationsOpened: boolean = false;
  @Input() view: View = null;
  @Input() isLoading: boolean = false;
  @Output() private isLoadingChange: EventEmitter<boolean> = new EventEmitter();
  @Input() searchValue: string = null;
  @Output() private searchValueChange: EventEmitter<string> = new EventEmitter();
  readonly views: typeof View = View;

  constructor(
    public router: Router,
    private debug: DebugService,
    public notifications: NotificationsService
  ) {
    this.debug.log('Router url:', this.router.url);
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  closeMenu() {
    this.openMenu = false;
  }

  toggleNotifications() {
    this.openNotifications = !this.openNotifications;
    this.wasNotificationsOpened = this.openNotifications;
  }

  onOpenNotificationsChange(open: boolean) {
    if (!open && this.wasNotificationsOpened) {
      this.notifications.markAllAsRead();
    }
  }

  onSearchTap() {
    this.isLoading = true;
    this.isLoadingChange.emit(this.isLoading);
  }

  onSearchValueChange(value: string) {
    this.searchValueChange.emit(value);
  }

}
