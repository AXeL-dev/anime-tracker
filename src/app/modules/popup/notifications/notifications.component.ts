import { Component, OnInit } from '@angular/core';
import { Notification, NotificationType } from 'src/app/models/notification';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationTypes: typeof NotificationType = NotificationType;

  constructor(public notifications: NotificationsService) { }

  ngOnInit(): void {
  }

}
