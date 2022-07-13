import { Notification } from 'src/app/models/notification';
import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../animations/animations';
import {NotificationsComponent} from './notifications/notifications.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  constructor() {}


  
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
  
  isNotifOpen: boolean = false

  count = this.notifications.length;
  notify = false;
  // @Input() count:number = notifCount;

  toggleNotifMenu(): void {
    this.isNotifOpen = !this.isNotifOpen;
    this.count= 0;
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

  // Notification Emulator
  addNotif() {
    this.count++;
    this.notify = true;
  }

  setNotifCount(event: any){
    this.count = event;
  }

  ngOnInit(): void {
    // this._notifService.getNotifsByUserId().subscribe((data: any)=>{
    //   this.count = data.length();
    // })
    
  }
}

