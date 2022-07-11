import { Injectable } from '@angular/core';
import { Notification } from 'src/app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  // private notifications: Notification[] = new Array<Notification>();
  notifications = [
  // notifications: Notification[] = [
    {
      id: "1",
      message: "message1",
    },
    {
      id: "2",
      message: "message1",
    },
    {
      id: "3",
      message: "message1",
    },
    {
      id: "4",
      message: "message1",
    }
  ]

  // notifCount$ = this.notifications.length.asObservable();

}
