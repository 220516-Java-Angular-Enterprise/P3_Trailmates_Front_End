import { NotificationService } from './../services/notification.service';
import { Notification } from 'src/app/models/notification';
import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  constructor(private _notificationService: NotificationService) {}


  
  notifications: Notification[] = []
  
  isNotifOpen: boolean = false
  notify = false;

  
  ngOnInit(): void {
    this.getNotifs()
  }

  getNotifs(){
    this._notificationService.getAllNotifications()
    .subscribe(
      (data:any)=>{
      this.notifications = data;
      this.notifications.forEach(notification=>{
        notification.timeCreated = new Date(notification.timeCreated).toLocaleString()
      })
    })
  }

  deleteNotif(id: string){
    this._notificationService.deleteNotification(id);
  }

  toggleNotifMenu(): void {
    this.isNotifOpen = !this.isNotifOpen;
  }

  notifState() {
    return this.isNotifOpen ? 'enter' : 'leave';
  }

  clickedOutsideNotif(): void {
    this.isNotifOpen = false;
  }

  isUserMenuOpen: boolean = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  
  userMenuState() {
    return this.isUserMenuOpen ? 'enter':'leave';
  }

  clickedOutsideUser(): void {
    this.isUserMenuOpen = false;
  }

  updateNotif(notif: Notification){
    this.deleteNotif(notif.id!)
    this.getNotifs();
    this.getNotifs();
  }


}

