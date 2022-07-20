import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { Notification } from 'src/app/models/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  constructor(private route: Router) { }

  @Input() notifications: Notification[] = [];
  @Output() passDeleteNotif: EventEmitter<Notification> = new EventEmitter<Notification>()

  notifCount = this.notifications.length;


  deleteNotif(notif: Notification){
    this.passDeleteNotif.emit(notif);
  }
  
  
  goToMessages(convo_id: any){
    this.route.navigateByUrl("/messaging/groupchat/"+convo_id);
  }

  goToProfile(username: any){
    this.route.navigateByUrl("/profile/"+username);
  }

  ngOnInit(): void {
    this.notifications = this.notifications;
  }

  goToTrail(){
    this.route.navigateByUrl("/trailpage");
  }

}
