
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';
import { Notification } from 'src/app/models/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  template: `<app-header [count]="notifCount"></app-header>`
})
export class NotificationsComponent implements OnInit {

  constructor(private route: Router) { }

  notifications: Notification[] = [
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

  // @Output() notifCount = new EventEmitter<number>();
  notifCount = this.notifications.length;


  deleteNotif(notif: Notification){
    console.log("deleting notifcation #" + notif.id+"...");
  }
  
  onClick(){
    console.log("I was clicked!")
  }
  
  
  ngOnDestroy() {
    console.log("I was destroyed.")
  }


  goToMessages(){
    this.route.navigateByUrl("/messaging/"+localStorage.getItem('id'));
  }


  
  ngOnInit(): void {
    console.log("i was born")
    this.notifications = this.notifications;
    console.log(`Notifications count: ${this.notifCount}`);
  }

}
