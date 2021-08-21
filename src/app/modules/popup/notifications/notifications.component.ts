import { Component, OnInit } from '@angular/core';
import { NotificationType, NotificationStatus } from 'src/app/models/notification';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationTypes: typeof NotificationType = NotificationType;
  notificationStatus: typeof NotificationStatus = NotificationStatus;

  constructor(public notifications: NotificationsService) { }

  ngOnInit(): void {
  }

}
