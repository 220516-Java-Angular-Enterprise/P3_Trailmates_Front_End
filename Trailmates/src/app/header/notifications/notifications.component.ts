
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  // template: `<app-header [count]="notifCount"></app-header>`
})
export class NotificationsComponent implements OnInit {

  constructor(private route: Router) { }


  @Input() notifications: Notification[] = [];

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
    this.route.navigateByUrl("/messaging")///"+localStorage.getItem('id'));
  }


  
  ngOnInit(): void {
    this.notifications = this.notifications;
  }

}
