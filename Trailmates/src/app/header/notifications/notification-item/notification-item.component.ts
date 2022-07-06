import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  // @Input() notifications: Notification[];
  @Input()
  notif!: Notification;
  @Input()
  pizza!: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.pizza)
  }

}
