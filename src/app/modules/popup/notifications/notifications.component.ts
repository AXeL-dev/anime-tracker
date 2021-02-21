import { Component, OnInit } from '@angular/core';
import { Notification, NotificationType } from 'src/app/models/notification';
import { DebugService } from 'src/app/services/debug.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private notifications: NotificationsService, private debug: DebugService) {
    this.debug.log('Notifications:', this.notifications.get());
  }

  ngOnInit(): void {
  }

  getByType(type: NotificationType) {
    return this.notifications.get().filter((notification: Notification) => notification.type === type);
  }

  getCount() {
    return this.notifications.get().length;
  }

}
