import { TrailFlag } from './../models/trailFlag';
import { NotificationService } from './../services/notification.service';
import { Notification } from 'src/app/models/notification';
import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../animations/animations';
import { TrailFlagService } from '../services/trail-flag.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  constructor(private _notificationService: NotificationService, private _trailFlagService: TrailFlagService) {}


  
  notifications: Notification[] = []
  trailFlags: TrailFlag[] = [];
  
  isNotifOpen: boolean = false;
  notify = false;
  isUserMenuOpen: boolean = false;
  
  ngOnInit(): void {
    this.getNotifs()
    this.getTrailFlags();

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

  getTrailFlags(){
    this._trailFlagService.getAllByUser(localStorage.getItem('id')!).subscribe(
      (data:any)=>{
        this.trailFlags = data
        // Converts date longs into mm/dd/yyyy
        this.trailFlags.forEach(
          flag=>{
            flag.dateInt = this.getFormattedDate(this.convertDate(flag.dateInt!)) 
          }
        )
      }
    )
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



  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  
  userMenuState() {
    return this.isUserMenuOpen ? 'enter':'leave';
  }

  clickedOutsideUser(): void {
    this.isUserMenuOpen = false;
  }

  updateNotifOnDelete(notif: Notification){
    this.deleteNotif(notif.id!)
    this.getNotifs();
  }

  updateFlagOnDelete(flag: TrailFlag){
    console.log(flag)
    this.deleteFlag(flag);
    this.getTrailFlags();
  }

  deleteFlag(flag: TrailFlag){
    this._trailFlagService.removeTrailById(flag.id!).subscribe(
      data=>{console.log(data)}
    )
  }

  private getFormattedDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}

  private convertDate(dateLong: number){
    return new Date((dateLong*1000*60*60*24))
  }


}

